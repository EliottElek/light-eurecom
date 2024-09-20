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

export async function getDemos(): Promise<Demo[] | null> {
  try {
    const { data: demos } = await axios.get("http://localhost:5000/demos")
    return demos
  } catch (e) {
    return null
  }
}

export async function getLocalDemos(): Promise<any[] | null> {
  try {
    const file = await fs.readFile(DEMOS_PATH + "manifest.json", 'utf8');
    const data = JSON.parse(file);
    return data as any[]
  } catch (e) {
    console.log(e)
    return null
  }
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
export async function getHomeDemo(): Promise<LocalDemo | null> {
  try {
    const file = await fs.readFile(DEMOS_PATH + `home.json`, 'utf8');
    const data = JSON.parse(file);
    return data as LocalDemo
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getDemo(demo_id: string) {
  try {
    const { data: demo } = await axios.get(`http://localhost:5000/demos/${demo_id}`)
    return demo
  } catch (e) {
    return [{ name: 'an error occured.' }]
  }
}
