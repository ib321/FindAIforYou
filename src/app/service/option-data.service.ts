import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionDataService {

  pricingModelOptions = [
    { value: 'Free', label: 'Free' },
    { value: 'Freemium', label: 'Freemium' },
    { value: 'GitHub', label: 'GitHub' },
    { value: 'Google Colab', label: 'Google Colab' },
    { value: 'Open Source', label: 'Open Source' },
    { value: 'Paid', label: 'Paid' },
  ];

  tagOptions = [
    { value: 'AI Detection', label: 'AI Detection' },
    { value: 'Aggregators', label: 'Aggregators' },
    { value: 'Avatar', label: 'Avatar' },
    { value: 'Chat', label: 'Chat' },
    { value: 'Copywriting', label: 'Copywriting' },
    { value: 'Finance', label: 'Finance' },
    { value: 'For Fun', label: 'For Fun' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Generative Art', label: 'Generative Art' },
    { value: 'Generative Code', label: 'Generative Code' },
    { value: 'Generative Video', label: 'Generative Video' },
    { value: 'Image Improvement', label: 'Image Improvement' },
    { value: 'Image Scanning', label: 'Image Scanning' },
    { value: 'Inspiration', label: 'Inspiration' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Motion Capture', label: 'Motion Capture' },
    { value: 'Music', label: 'Music' },
    { value: 'Podcasting', label: 'Podcasting' },
    { value: 'Productivity', label: 'Productivity' },
    { value: 'Prompt Guides', label: 'Prompt Guides' },
    { value: 'Research', label: 'Research' },
    { value: 'Self-Improvement', label: 'Self-Improvement' },
    { value: 'Social Media', label: 'Social Media' },
    { value: 'Speech-To-Text', label: 'Speech-To-Text' },
    { value: 'Text-To-Speech', label: 'Text-To-Speech' },
    { value: 'Text-To-Video', label: 'Text-To-Video' },
    { value: 'Translation', label: 'Translation' },
    { value: 'Video Editing', label: 'Video Editing' },
    { value: 'Voice Modulation', label: 'Voice Modulation' },
  ];

  constructor() { }

  getPricingModelOptions() {
    return this.pricingModelOptions;
  }

  getTagOptions() {
    return this.tagOptions;
  }

}
