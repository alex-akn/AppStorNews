import { trigger, state, style, transition, animate } from '@angular/animations'

export const appAnimation = 
trigger('appState', [
    state('shiftedUp', style({transform: 'translateY(0) translateX(0)'})),
    state('shiftedRight', style({transform: 'translateX(0)'})),
          
    transition('void => shiftedUp', [
      style({transform: 'translateY(300%)', }),
      animate('300ms ease-out')
    ]),
    transition('shiftedUp => void', [      
      animate('300ms linear', style({transform: 'translateX(100%)'}))
    ]),
    transition('void => shiftedRight', [
      style({transform: 'translateX(100%)'}),
      animate('300ms linear')
    ]),
    transition('shiftedRight => void', [      
      animate('300ms linear', style({transform: 'translateX(100%)'}))
    ])
  ]);

export const listAnimation = 
trigger('listState', [
    state('shiftedLeft', style({transform: 'translateX(0)'})),
    state('shiftedRight', style({transform: 'translateX(0)'})),
          
    transition('void => shiftedLeft', [
      style({transform: 'translateX(-100%)'}),
      animate('300ms linear')
    ]),
    transition('shiftedLeft => void', [
      style({position: 'absolute', top:'0px'}),
      animate('300ms linear', style({transform: 'translateX(-100%)'}))
    ]),
    transition('void => shiftedRight', [
      style({transform: 'translateX(100%)'}),
      animate('300ms linear')
    ]),
    transition('shiftedRight => void', [
      style({position: 'absolute', top:'0px'}),
      animate('300ms linear', style({transform: 'translateX(100%)'}))
    ])
  ])
