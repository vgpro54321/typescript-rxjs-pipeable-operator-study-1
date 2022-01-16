// Import stylesheets
import './style.css';
import { of } from 'rxjs';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

console.log('app start');

let o$ = of(1, 2, 3);
o$.subscribe((x) => {
  console.log(x);
});
