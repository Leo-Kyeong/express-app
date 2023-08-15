import * as express from "express";
import { Cat } from "./cats.model";
import { Router } from "express";
import { createCat, deleteCat, readAllCat, readCat, updateCat, updatePartialCat } from "./cats.service";

const router = Router();

// 라우터
// Client 또는 F-E에서 End Point로 HTTP 요청을 할 수 있다.

// READ 고양이 전체 데이터 다 조회 API
router.get('/cats', readAllCat);

// READ 특정 고양이 데이터 조회 API
router.get('/cats/:id', readCat);

// CREATE 고양이 데이터 추가 API
router.post('/cats', createCat);

// UPDATE 고양이 데이터 업데이트 -> PUT
router.put('/cats/:id', updateCat);

// UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
router.patch('/cats/:id', updatePartialCat);

// DELETE 고양이 데이터 삭제 -> DELETE
router.delete('/cats/:id', deleteCat);

export default router;
