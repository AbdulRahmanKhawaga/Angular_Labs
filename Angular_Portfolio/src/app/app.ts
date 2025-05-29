import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Hero } from './hero/hero';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Portfolio } from './portfolio/portfolio';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar,Hero,About,Skills,Portfolio,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Angular_Portfolio';
}
