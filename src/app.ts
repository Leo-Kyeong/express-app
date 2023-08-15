import * as express from 'express'
import { Cat } from "./app.model";


const app: express.Express = express(); // express instance
const port = 8000;

// 미들웨어
// 특정 라우터로 요청이 오면 미들웨어를 한 번 경유 후에 해당 라우터로 이동한다.
// 요청이 오면 순차적으로 코드를 읽기 때문에 미들웨어의 위치에 따라서 적용되는 라우터가 상이할 수 있다.
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log('this is logging middleware');
  next(); // 다음 라우트로 이동
});

// 라우터
// Client 또는 F-E에서 End Point로 HTTP GET 요청을 할 수 있다.
// READ 고양이 전체 데이터 다 조회 API
app.get('/cats', (req: express.Request, res: express.Response) => {
    try {
        const cats = Cat;
        res.status(200).send({
            success: true,
            data: {
                cats,
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
});

// READ 특정 고양이 데이터 조회 API
app.get('/cats/:id', (req: express.Request, res: express.Response) => {
    try {
        const params = req.params;
        const cat = Cat.find((cat) => {
            return cat.id === params.id;
        });
        res.status(200).send({
            success: true,
            data: {
                cat,
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
});

// JSON middleWare
app.use(express.json());

// CREATE 고양이 데이터 추가 API
app.post('/cats', (req: express.Request, res: express.Response) => {
    try {
        const data = req.body;
        console.log(data);
        Cat.push(data);
        res.status(200).send({
            success: true,
            data: {},
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
});

// 미들웨어는 무조건 경유하기 때문에 잘못된 엔드포인트 요청일 경우의 예외처리도 가능하다.
app.use((req, res, next) => {
  console.log('this is logging middleware');
  res.send({
    error: '404 not found error'
  })
});

app.listen(port, () => {
  console.log('server is on...');
});
