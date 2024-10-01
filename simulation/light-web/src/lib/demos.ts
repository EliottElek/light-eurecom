import axios from 'axios'
import { promises as fs } from 'fs';
import path from 'path';

const DEMOS_PATH = path.join(process.cwd(), 'src/demos/');

export interface Demo {
  id: number
  name: string
  description: string,
  action: string,
  image: string
}
export interface LocalDemo {
  id: number
  name: string
  description: string,
  action: string,
  image: string,
  slug: string
  active: boolean
}


export async function getLocalDemo(demo_id: string): Promise<LocalDemo | null> {
  try {
    const file = await fs.readFile(DEMOS_PATH + `demo${demo_id}.json`, 'utf8');
    const data = JSON.parse(file);
    return data as LocalDemo
  } catch (e) {
    console.log(e)
    return null
  }
}

