import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export interface iframeConfig {
  height: string,
  name: string,
  id: string,
  scrolling: string,
  sandbox: string,
  src: string,
  srcdoc: string,
  width: string
};


@Component({
  selector: 'wfw-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements OnInit {
  @Input() config: iframeConfig;
  constructor(
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() { }

  sanitizeSrcUrl() {
    return (this.config.src ? this.sanitizer.bypassSecurityTrustResourceUrl(this.config.src) : null);
  }
}
