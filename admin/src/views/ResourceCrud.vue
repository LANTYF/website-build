<!--  -->
<template>
  <avue-crud
    :option="option"
    :page="page"
    :data="data"
    @row-save="save"
    @row-del="remove"
    @row-update="update"
    @on-load="onLoad"
    @sort-change="sortChange"
    @search-change="searchChange"
  ></avue-crud>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  data = [];
  option = {};
  num = 1;
  where = {};
  page = {
    total: 0,
    pagerCount: 5,
    currentPage: 1,
    pageSize: 5,
    pageSizes: [5, 10, 15, 20, 25, 100]
  };
  @Prop(String) resource!: string;

  async save(row: any, done: any, loading: any) {
    await this.$http.post(`/${this.resource}`, row);
    this.fetch();
    done();
    await this.$message({
      type: "success",
      message: "保存成功"
    });
  }

  async remove(row: any) {
    try {
      await this.$confirm("是否确定删除?");
    } catch (e) {
      return;
    }
    await this.$http.delete(`/${this.resource}/${row._id}`);
    this.fetch();
  }

  async update(row: any, index: any, done: any) {
    delete row.$index;
    await this.$http.put(`/${this.resource}/${row._id}`, row);
    this.fetch();
    done();
  }

  async fetch() {
    const res = await this.$http.get(`/${this.resource}`, {
      params: {
        pageSize: this.page.pageSize,
        currentPage: this.page.currentPage,
        num: this.num,
        where: this.where
      }
    });
    this.data = res.data.data;
    this.page.total = res.data.total;
  }

  onLoad(page: any) {
    (this.page.pageSize = page.pageSize),
      (this.page.currentPage = page.currentPage);
    this.fetch();
  }

  sortChange(val: any) {
    switch (val.order) {
      case "ascending":
        this.num = 1;
        this.fetch();
        return;
      case "descending":
        this.num = -1;
        this.fetch();
        return;
      case "null":
        this.fetch();
        return;
      default:
        "num";
    }
  }

  searchChange(where: any, done: any) {
    this.where = where;
    this.fetch();
    done();
  }

  async fetchOption() {
    const res = await this.$http.get(`/${this.resource}/option`);
    this.option = res.data;
  }

  async onload() {
    const res = await await this.$http.get(`/${this.resource}`);
  }

  created() {
    this.fetch();
    this.fetchOption();
  }
}
</script>

<style lang='scss'>
</style>