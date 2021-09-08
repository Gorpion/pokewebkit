import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RomHeader, GbaService } from 'src/app/gba/services/rom.service';

@Component({
  selector: 'app-rom-landing',
  templateUrl: './rom-landing.component.html',
  styleUrls: ['./rom-landing.component.css']
})
export class RomLandingComponent implements OnInit {

  constructor(private gbaService: GbaService, private title: Title, private router: Router) { }

  ngOnInit(): void {
    this.gbaService.romLoaded.subscribe(() => {
      let header: RomHeader = this.gbaService.header;
      let title: string = 'PokéWebKit: ' + header.title + ' (' + header.gameCode + ')' + (header.version == 1 ? 'v1.1' : '');
      this.title.setTitle(title);

      this.router.navigate(['/']);
    });
  }

  public onFileInput(event: any) {
    let r = new FileReader();

    // can't use class variables in the onload
    let gbaService: GbaService = this.gbaService;
    let router: Router = this.router; 
    r.onload = function() {
      let startTime: number = Date.now();
      let fileData = r.result;
      gbaService.loadRom(fileData as ArrayBuffer, startTime);

      router.navigate(['/']);
    }
    r.readAsArrayBuffer(event.target.files[0]);
  }

}
