import { writable, get } from "svelte/store";
import { browser } from "$app/environment";
import { availableAudioUrl } from "$lib/utils/convertOggToMp3.client";

const savedAudioOn = typeof localStorage !== "undefined" ? localStorage.getItem("audioOn") === "true" : false;

const audioOnStore = writable<boolean>(savedAudioOn ?? false);

export function getAudioOn(): boolean {
  return get(audioOnStore);
}

export function setAudioOn(audioOn: boolean): void {
  audioOnStore.set(audioOn);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("audioOn", audioOn.toString());
  }
}

let audioContext: AudioContext | null = null;
let audioBuffer: AudioBuffer | null = null;
let audioCache: string | null = null;

async function loadAudio(oggUrl: string): Promise<void> {
  if (audioCache === oggUrl) return;
  audioCache = oggUrl;
  const audioUrl = await availableAudioUrl(oggUrl);
  const response = await fetch(audioUrl);
  const arrayBuffer = await response.arrayBuffer();

  audioContext = new AudioContext();
  try {
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  } catch (error) {
    console.error("Error decoding audio data:", error);
  }
}

export async function playAudio(oggUrl: string | null) {
  if (!browser || !getAudioOn() || !oggUrl) return;
  await loadAudio(oggUrl);
  if (audioBuffer && audioContext) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  }
}
