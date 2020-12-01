import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { IntercomService } from './intercom.service';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private title: string = "";
  private destination: string = "";

  constructor(
    //private route: ActivatedRoute,
    private intercom: IntercomService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  setTitle(path:string):string{    
    const metas = [
      'Angebote im App Store',
      'Angebote im Mac App Store',
      'Neue Apps und Spiele im App Store',
      'App Store Download Charts',
      'Aktuelle Angebote im iOS App Store | AppStorNews',
      'Aktuelle Angebote im Mac App Store | AppStorNews',
      'Neue Apps im iOS und Mac App Store | AppStorNews',
      'Top Apps im iOS und Mac App Store | AppStorNews',
      'Die letzten Preissenkungen, Schnäppchen, Deals, Angebote, gratis und reduzierte Apps &amp; Spiele im iOS App Store',
      'Die letzten Preissenkungen, Schnäppchen, Deals, Angebote, gratis und reduzierte Apps im Mac App Store',
      'Entdecke und teile neue Apps und Spiele aus dem AppStore',
      'Die aktuellen Top 200 Charts der beliebt kostenlos und Kostenpflichtig Apps &amp; Spiele für iPhone, iPad und Mac'
    ];
    const i = path == 'deals' ? 0 : path == 'deals-mac' ? 1 : path=="new-apps" ?2 : 3;
        
    const shortTitle = metas[i];
    const title = metas[i + 4];
    const descr = metas[i + 8];
    const thisUrl = 'https://appstor.news/' + path;
    this.title = shortTitle;
    this.intercom.setNewTitle(shortTitle);

    this.titleService.setTitle(title);
    if(!this.metaService.updateTag({name: 'description', content: descr})){
      this.metaService.addTag({name: 'description', content: descr});
    }
    //twitter
    if(!this.metaService.updateTag({name: 'twitter:title', content: title})){
      this.metaService.addTag({name: 'twitter:title', content: title});
    }
    if(!this.metaService.updateTag({name: 'twitter:description', content: descr})){
      this.metaService.addTag({name: 'twitter:description', content: descr});
    }
    //facebook
    if(!this.metaService.updateTag({property: 'og:title', content: title})){
      this.metaService.addTag({property: 'og:title', content: title});
    }
    if(!this.metaService.updateTag({property: 'og:description', content: descr})){
      this.metaService.addTag({property: 'og:description', content: descr});
    }
    if(!this.metaService.updateTag({property: 'og:url', content: thisUrl})){
      this.metaService.addTag({property: 'og:url', content: thisUrl});
    }
    
    return shortTitle;
  }   
}
