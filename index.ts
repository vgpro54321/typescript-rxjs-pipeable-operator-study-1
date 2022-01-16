// Import stylesheets
import './style.css';
import {
  Observable,
  of,
  interval,
  timer,
  Subscriber,
  throwError,
  concatWith,
} from 'rxjs';
import { take } from 'rxjs/operators';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

console.log('app start');

let o$ = timer(1000, 1000).pipe(
  take(5),
  concatWith(throwError(() => new Error('Oupsie')))
); //of(1, 2, 3);

// o$.subscribe((x) => {
//   console.log('source = ', x);
// });

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
): Observable<T> {
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

function subscriberCountOperator<T>() {
  return function <T>(source: Observable<T>): Observable<T> {
    return subscriberCount<T>(source, 'Description from operator');
  };
}

//let op$ = subscriberCount(o$, 'Experiment');
//let op$ = o$.pipe();
//let op$ = throwError(new Error('From start'));
let op$ = o$.pipe(subscriberCountOperator());
let sub = op$.subscribe((x) => {
  console.log('operator = ', x);

  if (x > 2) {
    sub.unsubscribe();
  }
});
