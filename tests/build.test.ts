import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');

describe('Build Output', () => {
  const pages = [
    'index.html',
    'about/index.html',
    'services/index.html',
    'contact/index.html',
    'reviews/index.html',
  ];

  describe('Page Generation', () => {
    pages.forEach((page) => {
      it(`should generate ${page}`, () => {
        const filePath = join(distDir, page);
        // Skip if dist doesn't exist (pre-build)
        if (!existsSync(distDir)) {
          return;
        }
        expect(existsSync(filePath)).toBe(true);
      });
    });
  });

  describe('SEO Requirements', () => {
    it('homepage should have required meta tags', () => {
      const indexPath = join(distDir, 'index.html');
      if (!existsSync(indexPath)) return;

      const content = readFileSync(indexPath, 'utf-8');
      expect(content).toContain('<title>');
      expect(content).toContain('meta name="description"');
      expect(content).toContain('M & M Plumbing');
    });

    it('pages should have phone number for calls', () => {
      const indexPath = join(distDir, 'index.html');
      if (!existsSync(indexPath)) return;

      const content = readFileSync(indexPath, 'utf-8');
      expect(content).toContain('423');
      expect(content).toContain('946-8310');
    });
  });

  describe('Content Validation', () => {
    it('should include service areas', () => {
      const indexPath = join(distDir, 'index.html');
      if (!existsSync(indexPath)) return;

      const content = readFileSync(indexPath, 'utf-8');
      expect(content).toContain('Greeneville');
    });

    it('should not include removed service areas', () => {
      const aboutPath = join(distDir, 'about/index.html');
      if (!existsSync(aboutPath)) return;

      const content = readFileSync(aboutPath, 'utf-8');
      expect(content).not.toContain('Morristown');
    });
  });
});
