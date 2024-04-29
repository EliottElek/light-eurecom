import { parse as parseFeed } from 'rss-to-json'
import { array, number, object, parse, string } from 'valibot'
import axios from 'axios'


export interface Demo {
  id: number
  name: string
  description: string,
  action: string
}

export async function getAllDemos(): Promise<Demo[] | null> {
  try {
    const { data: demos } = await axios.get("http://localhost:5000/demos")
    return demos
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
