import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'showcase-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  contextItems1: any;
  contextItems2: any;
  megaMenuItems: any;
  constructor() { }

  ngOnInit() {

    // Menus
    this.contextItems1 = [
      {
        label: 'Label',
        icon: 'fa-snowflake-o',
        items: [{
          label: 'Label',
          icon: 'fa-snowflake-o',
          items: [
            { label: 'Label', icon: 'fa-snowflake-o' },
            { label: 'Label', icon: 'fa-snowflake-o' }
          ]
        },
        { label: 'Label', icon: 'fa-snowflake-o' },
        { label: 'Label', icon: 'fa-snowflake-o' }
        ]
      },
      {
        label: 'Label',
        icon: 'fa-snowflake-o',
        items: [
          { label: 'Label', icon: 'fa-snowflake-o' },
          { label: 'Label', icon: 'fa-snowflake-o' }
        ]
      },
      {
        label: 'Label',
        icon: 'fa-snowflake-o',
        items: [
          {
            label: 'Label', icon: 'fa-snowflake-o'
          },
          {
            label: 'Label',
            icon: 'fa-snowflake-o',
            items: [
              {
                label: 'Label', icon: 'fa-snowflake-o',
                items: [
                  { label: 'Label', icon: 'fa-snowflake-o' }
                ]
              },
              {
                label: 'Label', icon: 'fa-snowflake-o'
              }
            ]
          }
        ]
      }
    ];

    this.contextItems2 = [
      {
        label: 'Label',
        items: [{
          label: 'Label',
          items: [
            { label: 'Label' },
            { label: 'Label' }
          ]
        },
        { label: 'Label' },
        { label: 'Label' }
        ]
      },
      {
        label: 'Label',
        items: [
          { label: 'Label' },
          { label: 'Label' }
        ]
      }
    ];

    this.megaMenuItems = [
      {
        label: 'Label', icon: 'fa-snowflake-o',
        items: [
          [
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            },
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            }
          ],
          [
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            },
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            }
          ]
        ]
      },
      {
        label: 'Label', icon: 'fa-snowflake-o',
        items: [
          [
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            },
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            }

          ],
          [
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            },
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            }
          ],
          [
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            },
            {
              label: 'Label',
              items: [{ label: 'Label' }, { label: 'Label' }]
            }
          ]
        ]
      }
    ];
  }

}
