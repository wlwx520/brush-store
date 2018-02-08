<template>
  <div class="home">

    <div class="top">
      <el-button type="primary" @click="partnerMangager">伙伴管理</el-button>
      <el-button type="primary" @click="goodsMangage">货物管理</el-button>
      <div class="topInner"/>
      <p>总花费：{{this.totalCoast}}元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;货物花费：{{this.coast}}元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;运费：{{this.freight}}元</p>
    </div>

    <div class="center">
      <el-form :inline="true" :model="condition" ref="myform">

        <el-form-item label="记录时间">
          <div class="block">
            <el-date-picker
              v-model="condition.datetime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="货物">
          <el-select v-model="condition.goods" placeholder="">
            <el-option>任意</el-option>
            <el-option
              v-for="item in goods"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="伙伴">
          <el-select v-model="condition.partner" placeholder="">
            <el-option>任意</el-option>
            <el-option
              v-for="item in partner"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="condition.inOrOut" placeholder="">
            <el-option
              v-for="item in inOrOut"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">重置</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="bottom">
      <el-table :data="records" v-loading="loading" element-loading-text="加载中,请等待">
        <el-table-column prop="time" label="时间" align="center"></el-table-column>
        <el-table-column prop="goods" label="货物" align="center"></el-table-column>
        <el-table-column prop="partner" label="伙伴" align="center"></el-table-column>
        <el-table-column prop="inOrOut" label="状态" align="center"></el-table-column>
        <el-table-column prop="univalent" label="单价/元" align="center"></el-table-column>
        <el-table-column prop="count" label="数量/千克" align="center"></el-table-column>
        <el-table-column prop="freight" label="运费/元" align="center"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="removeRecord(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 15, 20]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogShow" width="500px" center>
        <div class="dialog">
          <div class="dialogTop">
            <el-form :inline="true">
              <el-form-item>
                <el-input v-model="dialogAdd"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="dialogListAdd" >新增</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="dialogListSave">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="dialogCenter">
            <el-table :data="dialogList">
              <el-table-column prop="name" label="名字" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="dialogListRemove(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="添加记录" :visible.sync="addRecordShow" width="500px" center>
        <div class="addRecord">
          <el-form :inline="true" :model="addRecord">
            <el-form-item label="货物">
              <el-input v-model="addRecord.goods"></el-input>
            </el-form-item>
            <el-form-item label="伙伴">
              <el-input v-model="addRecord.partner"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="addRecord.inOrOut"></el-input>
            </el-form-item>
            <el-form-item label="单价/元">
              <el-input v-model="addRecord.univalent"></el-input>
            </el-form-item>
            <el-form-item label="数量/千克">
              <el-input v-model="addRecord.count"></el-input>
            </el-form-item>
            <el-form-item label="运费/元">
              <el-input v-model="addRecord.freight"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { updateConfigure } from "@/api/configure";

export default {
  data() {
    return {
      totalCoast: 0,
      coast: 0,
      freight: 0,
      condition: {
        datatime: [],
        goods: "任意",
        partner: "任意",
        inOrOut: "任意"
      },
      records: [],
      total: 100,
      currrent: 1,
      size: 10,
      goods: [],
      partner: [],
      inOrOut: ["任意", "进货", "出货"],
      dialogList: [],
      loading: false,
      dialogTitle: "",
      dialogShow: false,
      dialogAdd: "",
      addRecordShow: false,
      addRecord: {}
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.submit();
    },
    handleCurrentChange(val) {
      this.currrent = val;
      this.submit();
    },
    submit() {
      //
    },
    partnerMangager() {
      this.dialogShow = true;
      this.dialogTitle = "伙伴";
      this.dialogList = this.partner;
    },
    goodsMangage() {
      this.dialogShow = true;
      this.dialogTitle = "货物";
      this.dialogList = this.goods;
    },
    dialogListSave() {
      updateConfigure(this.goods, this.partner);
    },
    dialogListAdd() {
      var obj = {};
      obj.name = this.dialogAdd;
      if (this.dialogTitle === "伙伴") {
        this.partner.push(obj);
        this.partnerMangager();
      }
      if (this.dialogTitle === "货物") {
        this.goods.push(obj);
        this.goodsMangage();
      }
    },
    dialogListRemove(val) {
      Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      if (this.dialogTitle === "伙伴") {
        this.partner.remove(val);
        this.partnerMangager();
      }
      if (this.dialogTitle === "货物") {
        this.goods.remove(val);
        this.goodsMangage();
      }
    },
    removeRecord(val) {}
  }
};
</script>

<style >
.top {
  margin-top: 10px;
  margin-left: 10px;
}
.topInner {
  margin-top: 20px;
  margin-left: 10px;
}
.center {
  margin-top: 20px;
  margin-left: 10px;
}
.bottom {
  margin-top: 5px;
  margin-left: 10px;
}
.footer {
  margin-top: 20px;
  margin-left: 10px;
}
.dialog {
  margin-top: 10px;
  margin-left: 10px;
  overflow: hidden;
  max-height: 500px;
}
.dialogTop {
  margin-top: 10px;
  margin-left: 10px;
}
.dialogCenter {
  margin-top: 10px;
  margin-left: 10px;
  overflow-y: auto;
}
.addRecord {
  margin-top: 10px;
  margin-left: 10px;
  overflow: hidden;
  max-height: 500px;
}
</style>
