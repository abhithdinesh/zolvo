param(
  [Parameter(Mandatory = $true)]
  [string]$Source,
  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory
)

Add-Type -AssemblyName System.Drawing

$processor = @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

public static class ZolvoLogoProcessor
{
    private const int BackgroundThreshold = 24;
    private const int BoundsThreshold = 90;
    private static readonly Color Navy = Color.FromArgb(16, 36, 58);

    private static int Brightness(Color color)
    {
        return (int)Math.Round(color.R * 0.2126 + color.G * 0.7152 + color.B * 0.0722);
    }

    private static Rectangle FindArtworkBounds(Bitmap source)
    {
        int left = source.Width;
        int top = source.Height;
        int right = -1;
        int bottom = -1;

        for (int y = 0; y < source.Height; y++)
        {
            for (int x = 0; x < source.Width; x++)
            {
                if (Brightness(source.GetPixel(x, y)) < BoundsThreshold)
                {
                    continue;
                }

                left = Math.Min(left, x);
                top = Math.Min(top, y);
                right = Math.Max(right, x);
                bottom = Math.Max(bottom, y);
            }
        }

        if (right < left || bottom < top)
        {
            throw new InvalidOperationException("No logo artwork was found in the source image.");
        }

        const int padding = 8;
        left = Math.Max(0, left - padding);
        top = Math.Max(0, top - padding);
        right = Math.Min(source.Width - 1, right + padding);
        bottom = Math.Min(source.Height - 1, bottom + padding);
        return Rectangle.FromLTRB(left, top, right + 1, bottom + 1);
    }

    private static int AlphaFrom(Color pixel)
    {
        int brightness = Brightness(pixel);
        if (brightness <= BackgroundThreshold)
        {
            return 0;
        }

        return Math.Min(255, (brightness - BackgroundThreshold) * 255 / (255 - BackgroundThreshold));
    }

    private static Bitmap Render(Bitmap source, Rectangle crop, Color foreground)
    {
        var rendered = new Bitmap(crop.Width, crop.Height, PixelFormat.Format32bppArgb);
        for (int y = 0; y < crop.Height; y++)
        {
            for (int x = 0; x < crop.Width; x++)
            {
                int alpha = AlphaFrom(source.GetPixel(crop.Left + x, crop.Top + y));
                rendered.SetPixel(x, y, Color.FromArgb(alpha, foreground.R, foreground.G, foreground.B));
            }
        }

        return rendered;
    }

    private static void SaveFavicon(Bitmap source, Rectangle logoBounds, string path)
    {
        int symbolHeight = Math.Min(215, logoBounds.Height - 48);
        var sourceSymbol = new Rectangle(logoBounds.Left, logoBounds.Top, Math.Min(210, logoBounds.Width), symbolHeight);
        using (var symbol = Render(source, sourceSymbol, Navy))
        using (var favicon = new Bitmap(512, 512, PixelFormat.Format32bppArgb))
        using (var graphics = Graphics.FromImage(favicon))
        {
            graphics.Clear(Color.Transparent);
            graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            graphics.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
            float scale = Math.Min(448f / symbol.Width, 448f / symbol.Height);
            int width = (int)Math.Round(symbol.Width * scale);
            int height = (int)Math.Round(symbol.Height * scale);
            int left = (512 - width) / 2;
            int top = (512 - height) / 2;
            graphics.DrawImage(symbol, new Rectangle(left, top, width, height));
            favicon.Save(path, ImageFormat.Png);
        }
    }

    public static void Create(string sourcePath, string outputDirectory)
    {
        Directory.CreateDirectory(outputDirectory);
        using (var source = new Bitmap(sourcePath))
        {
            Rectangle logoBounds = FindArtworkBounds(source);
            using (var white = Render(source, logoBounds, Color.White))
            using (var navy = Render(source, logoBounds, Navy))
            {
                white.Save(Path.Combine(outputDirectory, "zolvo-logo-white.png"), ImageFormat.Png);
                navy.Save(Path.Combine(outputDirectory, "zolvo-logo-navy.png"), ImageFormat.Png);
            }

            SaveFavicon(source, logoBounds, Path.Combine(outputDirectory, "zolvo-favicon.png"));
        }
    }
}
'@

Add-Type -TypeDefinition $processor -ReferencedAssemblies System.Drawing
[ZolvoLogoProcessor]::Create($Source, $OutputDirectory)
Copy-Item -LiteralPath $Source -Destination (Join-Path $OutputDirectory 'zolvo-logo-original.jpeg') -Force
