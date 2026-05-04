import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ProgramData {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  content: string;
}

export async function getPrograms(lang: string): Promise<ProgramData[]> {
  const dirPath = path.join(contentDirectory, 'programs', lang);
  if (!fs.existsSync(dirPath)) return [];

  const filenames = fs.readdirSync(dirPath);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(dirPath, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as { title: string; date: string; category: string; image: string; description: string }),
    };
  });
}

export async function getProgramBySlug(lang: string, slug: string): Promise<ProgramData | null> {
  const fullPath = path.join(contentDirectory, 'programs', lang, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...(data as { title: string; date: string; category: string; image: string; description: string }),
  };
}
