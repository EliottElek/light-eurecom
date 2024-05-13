import { parse as parseFeed } from 'rss-to-json'
import { array, number, object, parse, string } from 'valibot'
import axios from 'axios'


export interface Simulation {
  id: string
  name: string
  description: string,
}

export async function getAllSimulations(): Promise<Simulation[] | null> {
  try {
    const { data: simulations } = await axios.get("http://localhost:5000/simulations")
    return simulations
  } catch (e) {
    return null
  }
}
export async function getSimulation(simulation_id: string) {
  try {
    const { data: simulation } = await axios.get(`http://localhost:5000/simulations/${simulation_id}`)
    return simulation
  } catch (e) {
    return [{ name: 'an error occured.' }]
  }
}
