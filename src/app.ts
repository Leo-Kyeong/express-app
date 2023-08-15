import * as express from 'express'
import catsRoute from "./cats/cats.route";

class Server {
  public app: express.Application; // express instance
  public port = 8000;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRoute);
  }

  private setMiddleware() {
    // 미들웨어
    // 특정 라우터로 요청이 오면 미들웨어를 한 번 경유 후에 해당 라우터로 이동한다.
    // 요청이 오면 순차적으로 코드를 읽기 때문에 미들웨어의 위치에 따라서 적용되는 라우터가 상이할 수 있다.
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log('this is logging middleware');
      next(); // 다음 라우트로 이동
    });

    // JSON middleware
    this.app.use(express.json());

    this.setRoute();

    // 미들웨어는 무조건 경유하기 때문에 잘못된 엔드포인트 요청일 경우의 예외처리도 가능하다.
    this.app.use((req, res, next) => {
      console.log('this is logging middleware');
      res.send({
        error: '404 not found error'
      })
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(this.port, () => {
      console.log('server is on...');
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
