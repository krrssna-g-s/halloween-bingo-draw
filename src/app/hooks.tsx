import { useEffect, useState } from 'react';

const useSpeechSynthesis = () => {
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const _cache: Record<string, SpeechSynthesisVoice[]> = {};

  const loadVoicesWhenAvailable = (onComplete: () => void = () => {}) => {
    const localSpeechSynth = window.speechSynthesis;
    const localVoices = localSpeechSynth.getVoices();

    if (localVoices.length !== 0) {
      setVoices(localVoices);
      setSpeechSynth(localSpeechSynth);
      onComplete();
    } else {
      setTimeout(() => loadVoicesWhenAvailable(onComplete), 100);
    }
  };

  const getVoices = (locale: string): SpeechSynthesisVoice[] => {
    if (!speechSynth) {
      throw new Error('Browser does not support speech synthesis');
    }
    if (_cache[locale]) return _cache[locale];

    const filteredVoices = voices.filter(voice => voice.lang === locale);
    _cache[locale] = filteredVoices;
    return filteredVoices;
  };

  const playByText = (
    locale: string,
    text: string,
    onEnd?: (event: SpeechSynthesisEvent) => void
  ) => {
    const localVoices = getVoices(locale);
    const utterance = new SpeechSynthesisUtterance();
    utterance.voice = localVoices[0];
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.voiceURI = 'native';
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 0.8;
    utterance.text = text;
    utterance.lang = locale;

    if (onEnd) {
      utterance.onend = onEnd;
    }

    speechSynth?.cancel();
    speechSynth?.speak(utterance);
  };

  useEffect(() => {
    loadVoicesWhenAvailable(() => {
      console.log("loaded");
    });
  }, []);

  return { playByText };
};

export {useSpeechSynthesis};