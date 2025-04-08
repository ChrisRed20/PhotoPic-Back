import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000, // usuarios virtuales
  duration: '10s', // cuánto dura la prueba
};

export default function () {
  http.get('http://localhost:4000/api/photographer/'); // cambia a tu ruta
  sleep(1);
}
