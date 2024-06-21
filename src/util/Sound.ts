import { IsSoundOn } from "../stores/SoundStore";

export class Sound {
    private audioContext: AudioContext | null = null;
    private gainNode: GainNode | null = null;
    private buffer: AudioBuffer | null = null;
  
    constructor(private soundUrl: string) {}
  
    async load() {
      if (!this.audioContext) {
        // Create the AudioContext in response to a user gesture
        document.addEventListener('pointerdown', async() => {
          this.audioContext = new AudioContext();
          this.gainNode = this.audioContext.createGain();
  
          const response = await fetch(this.soundUrl);
          const arrayBuffer = await response.arrayBuffer();
          const audioData = await this.audioContext.decodeAudioData(arrayBuffer);
  
          this.buffer = audioData;
        });
      }
      // this.audioContext = new AudioContext();
      // this.gainNode = this.audioContext.createGain();
  
      // const response = await fetch(this.soundUrl);
      // const arrayBuffer = await response.arrayBuffer();
      // const audioData = await this.audioContext.decodeAudioData(arrayBuffer);
  
      // this.buffer = audioData;
    }
  
    play() {
      if (!IsSoundOn || !this.audioContext || !this.gainNode || !this.buffer) {
        return;
      }
  
      const source = this.audioContext.createBufferSource();
      source.buffer = this.buffer;
  
      const playbackRate = Math.random() * 0.2 + 0.9; // Random playback rate between 0.9 and 1.1
      source.playbackRate.value = playbackRate;
  
      source.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
  
      source.start(0);
    }
  }
  