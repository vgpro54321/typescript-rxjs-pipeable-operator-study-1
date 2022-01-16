// Import stylesheets
import './style.css';
import { Observable, of, interval, timer, Subscriber } from 'rxjs';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

console.log('app start');

let o$ = timer(1000, 1000); //of(1, 2, 3);
o$.subscribe((x) => {
  console.log('source = ', x);
});

function myOperator<T>(source: Observable<T>) {
  return source;
}

function filterNil() {
  return function <T>(source: Observable<T>): Observable<T> {
    return new Observable((subscriber) => {
      source.subscribe({
        next(value) {
          if (value !== undefined && value !== null) {
            subscriber.next(value);
          }
        },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        },
      });
    });
  };
}

function subscriberCount<T>(
  sourceObservable: Observable<T>,
  description: string
) {
  let counter = 0;
  return new Observable((subscriber: Subscriber<T>) => {
    const subscription = sourceObservable.subscribe(subscriber);
    counter++;
    console.log(`${description} subscriptions: ${counter}`);

    return () => {
      subscription.unsubscribe();
      counter--;
      console.log(`${description} subscriptions: ${counter}`);
    };
  });
}

let op$ = myOperator(o$);
op$.subscribe((x) => {
  console.log('operator = ', x);
});
