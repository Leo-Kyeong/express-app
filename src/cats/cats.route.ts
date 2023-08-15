import * as express from "express";
import { Cat } from "./cats.model";
import { Router } from "express";

const router = Router();

// 라우터
// Client 또는 F-E에서 End Point로 HTTP GET 요청을 할 수 있다.

// READ 고양이 전체 데이터 다 조회 API
router.get('/cats', (req: express.Request, res: express.Response) => {
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
router.get('/cats/:id', (req: express.Request, res: express.Response) => {
    try {
        const paramCatId = req.params.id;
        const cat = Cat.find((cat) => {
            return cat.id === paramCatId;
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

// CREATE 고양이 데이터 추가 API
router.post('/cats', (req: express.Request, res: express.Response) => {
    try {
        const data = req.body;
        Cat.push(data);
        res.status(201).send({
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

// UPDATE 고양이 데이터 업데이트 -> PUT
router.put('/cats/:id', (req: express.Request, res: express.Response) => {
    try {
        const paramCatId = req.params.id;
        const body = req.body;
        let result;
        Cat.forEach((cat) => {
            if (cat.id === paramCatId) {
                cat = body;
                result = cat;
            }
        })
        res.status(200).send({
            success: true,
            data: {
                result
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
});

// UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch('/cats/:id', (req: express.Request, res: express.Response) => {
    try {
        const paramCatId = req.params.id;
        const body = req.body;
        let result;
        Cat.forEach((cat) => {
            if (cat.id === paramCatId) {
                cat = {...cat, ...body};
                result = cat;
            }
        })
        res.status(200).send({
            success: true,
            data: {
                result
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
});

// DELETE 고양이 데이터 삭제 -> DELETE
router.delete('/cats/:id', (req: express.Request, res: express.Response) => {
    try {
        const paramCatId = req.params.id;
        const newCat = Cat.filter((cat) => cat.id !== paramCatId);
        res.status(200).send({
            success: true,
            data: {
                newCat,
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
});

export default router;
