import { Injectable, Global } from '@nestjs/common';
import { json } from 'express';

@Global()
@Injectable()
export class AppService {
  async index(model, query) {
    let query_search = null
    if (query.where) {
      const where = eval('(' + query.where + ')')
      const keys = Object.keys(where)
      if (keys.length !== 0) {
        const key = keys[0]
        const value = where[key].toString()
        query_search = {$or:[{[key]:{$regex:value}}]}
      }
    }
    const total = await model.countDocuments(query_search)
    let data
    if (!query.num) {
      data = await model.find()
    } else {
      data = await model.find(query_search).sort({'name':query.num}).limit(query.pageSize * 1).skip((query.currentPage - 1) * query.pageSize)
    }
    return {total, data}
  }

  async create(model, CreateDto) {
    await model.create(CreateDto)
    return {
      success: true
    }
  }

  async detail(model, id) {
    return await model.findById(id)
  }

  async update(model, id, updateDto) {
    await model.findByIdAndUpdate(id, updateDto)
    return {
      success: true
    }
  }

  async remove(model, id) {
    await model.findByIdAndDelete(id)
    return {
      success: true
    }
  }
}
