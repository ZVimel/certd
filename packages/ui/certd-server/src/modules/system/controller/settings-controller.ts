import { ALL, Body, Controller, Inject, Post, Provide, Query } from "@midwayjs/decorator";
import { CrudController } from "../../../basic/crud-controller";
import { SettingsService } from "../service/settings-service";

/**
 */
@Provide()
@Controller('/api/sys/settings')
export class SettingsController extends CrudController<SettingsService> {
  @Inject()
  service: SettingsService;

  getService() {
    return this.service;
  }

  @Post('/page')
  async page(@Body(ALL) body) {
    body.query = body.query ?? {};
    body.query.userId = this.ctx.user.id;
    return super.page(body);
  }

  @Post('/list')
  async list(@Body(ALL) body) {
    body.userId = this.ctx.user.id;
    return super.list(body);
  }

  @Post('/add')
  async add(@Body(ALL) bean) {
    bean.userId = this.ctx.user.id;
    return super.add(bean);
  }

  @Post('/update')
  async update(@Body(ALL) bean) {
    await this.service.checkUserId(bean.id, this.ctx.user.id);
    return super.update(bean);
  }
  @Post('/info')
  async info(@Query('id') id) {
    await this.service.checkUserId(id, this.ctx.user.id);
    return super.info(id);
  }

  @Post('/delete')
  async delete(@Query('id') id) {
    await this.service.checkUserId(id, this.ctx.user.id);
    return super.delete(id);
  }

}