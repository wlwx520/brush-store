<template>
  <div class="home">

    <div class="top">
      <el-button type="primary" @click="partnerMangager">伙伴管理</el-button>
      <el-button type="primary" @click="goodsMangage">货物管理</el-button>
      <el-button type="primary" @click="addRecordManager">添加记录</el-button>
      <el-button type="primary" @click="balanceManager">余额管理</el-button>
      <div class="topInner"/>
      <p>总款：{{this.totalCoast}}元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;货款：{{this.coast}}元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;运费：{{this.freight}}元</p>
    </div>

    <div class="center">
      <el-form :inline="true" :model="condition" >

        <el-form-item label="记录时间">
          <div class="block">
            <el-date-picker
              v-model="condition.datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="货物">
          <el-select v-model="condition.goods" >
            <el-option key="任意" label="任意" value="任意" ></el-option>
            <el-option
              v-for="item in goods"
              :key="item"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="伙伴">
          <el-select v-model="condition.partner" >
            <el-option key="任意" label="任意" value="任意" ></el-option>
            <el-option
              v-for="item in partner"
              :key="item"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="condition.inOrOut" >
            <el-option
              v-for="item in inOrOut"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="resetCondition">重置</el-button>
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
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="removeRecord(scope.row)">删除该记录</el-button>
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
      <el-dialog title="添加记录" :visible.sync="addRecordShow" width="500px" center @close="submit">
        <div class="addRecord">
          <el-form :inline="true" :model="addRecord" :rules="recodRules" ref="addRecordForm">
            <el-form-item label="时间" label-width="100px">
               <div class="block">
                  <el-date-picker
                    v-model="addRecord.time"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                  </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="货物" label-width="100px" porp="goods" >
              <el-select v-model="addRecord.goods" placeholder="请选择货物" >
                <el-option
                  v-for="item in goods"
                  :key="item"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="伙伴" label-width="100px" porp="partner" >
              <el-select v-model="addRecord.partner" placeholder="请选择伙伴" >
                <el-option
                  v-for="item in partner"
                  :key="item"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" label-width="100px" porp="inOrOut" >
              <el-select v-model="addRecord.inOrOut" placeholder="请选择状态" >
                <el-option
                  v-for="item in inOrOut2"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单价/元" label-width="100px" prop="univalent" >
              <el-input v-model="addRecord.univalent" ></el-input>
            </el-form-item>
            <el-form-item label="数量/千克" label-width="100px" prop="count" >
              <el-input v-model="addRecord.count"></el-input>
            </el-form-item>
            <el-form-item label="运费/元" label-width="100px" prop="freight" >
              <el-input v-model="addRecord.freight"></el-input>
            </el-form-item>
            <el-form-item label="   " label-width="100px">
                 <el-button type="primary" @click="saveRecord">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="余额管理" :visible.sync="balanceShow" width="700px" center @close="submit">
        <div class="balance">
          <div class="balanceTop">
            <el-form :inline="true" :model="balance" ref="myBalance" >
              <el-form-item label="货物">
                 <el-select v-model="balance.goods" >
                  <el-option key="任意" label="任意" value="任意" ></el-option>
                  <el-option
                    v-for="item in goods"
                    :key="item"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="伙伴">
                <el-select v-model="balance.partner" >
                  <el-option key="任意" label="任意" value="任意" ></el-option>
                  <el-option
                    v-for="item in partner"
                    :key="item"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="balanceQueryClick" >查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="balanceCenter">
            <el-table :data="balanceList" v-loading="balanceLoading" element-loading-text="加载中,请等待">
              <el-table-column prop="goods" label="货物" align="center"></el-table-column>
              <el-table-column prop="partner" label="伙伴" align="center"></el-table-column>
              <el-table-column prop="balance" label="余额/元" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" @click="balanceUpdate(scope.row)">修改余额</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="修改余额" :visible.sync="balanceUpdateShow" width="500px" center @close="balanceQueryClick">
        <el-form :inline="true" :model="balanceUpdateForm" ref="balanceForm" :rules="balanceRules">
          <el-form-item label="货物" label-width="100px" prop="goods">
            <el-select v-model="balanceUpdateForm.goods" placeholder="请选择货物" >
              <el-option
                v-for="item in goods"
                :key="item"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="伙伴" label-width="100px" prop="partner">
            <el-select v-model="balanceUpdateForm.partner" placeholder="请选择伙伴">
              <el-option
                v-for="item in partner"
                :key="item"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="余额值" label-width="100px">
            <el-input v-model="balanceUpdateForm.balance" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="修改值" label-width="100px" prop="update">
            <el-input v-model="balanceUpdateForm.update" placeholder="请输入需要修改的值"></el-input>
          </el-form-item>
          <el-form-item label="增或减" label-width="100px" prop="type">
            <el-select v-model="balanceUpdateForm.type" placeholder="请选择增加或减少">
              <el-option key="增加" label="增加" value="增加"></el-option>
              <el-option key="减少" label="减少" value="减少"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="   " label-width="100px">
            <el-button type="primary" @click="updateBalance">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div>
      <el-dialog :title="ensureTitle" :visible.sync="ensureShow" width="500px" center>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="danger" @click="ensure">删除</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { updateConfigure, getConfigure } from "@/api/configure";
import { save, query, queryWithTime, remove } from "@/api/record";
import { balanceQuery, balanceUpdate } from "@/api/balance";

export default {
  data() {
    var float_validator = (rule, value, callback) => {
      var re = /^\d+(\.\d{1,2})?$/;
      if (!re.test(value)) {
        callback(new Error("该值必须在0-999999之间的两位小数"));
      } else if (value < 0 || value > 999999) {
        callback(new Error("该值必须在0-999999之间的两位小数"));
      } else {
        callback();
      }
    };

    var null_validator = (rule, value, callback) => {
      var re = /^\d+(\.\d{1,2})?$/;
      if (value === null || value === "") {
        callback(new Error("该项不能为空"));
      } else {
        callback();
      }
    };

    return {
      ensureShow: false,
      ensureTitle: "",
      ensureType: 0,
      ensureData: "",
      recodRules: {
        univalent: [{ validator: float_validator, trigger: "blur" }],
        count: [{ validator: float_validator, trigger: "blur" }],
        freight: [{ validator: float_validator, trigger: "blur" }],
        goods: [{ validator: null_validator, trigger: "blur" }],
        partner: [{ validator: null_validator, trigger: "blur" }],
        inOrOut: [{ validator: null_validator, trigger: "blur" }]
      },
      balanceRules: {
        update: [{ validator: float_validator, trigger: "blur" }],
        goods: [{ validator: null_validator, trigger: "blur" }],
        partner: [{ validator: null_validator, trigger: "blur" }],
        type: [{ validator: null_validator, trigger: "blur" }]
      },
      balanceUpdateShow: false,
      balanceUpdateForm: {
        goods: "",
        partner: "",
        update: "",
        balance: "",
        type: ""
      },
      balance: {},
      balanceLoading: false,
      balanceList: [],
      balanceShow: false,
      totalCoast: 0,
      coast: 0,
      freight: 0,
      condition: {
        datetime: [],
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
      inOrOut2: ["进货", "出货"],
      dialogList: [],
      loading: false,
      dialogTitle: "",
      dialogShow: false,
      dialogAdd: "",
      addRecordShow: false,
      addRecord: {
        time: "",
        goods: "",
        partner: "",
        inOrOut: "",
        univalent: "",
        count: "",
        freight: ""
      }
    };
  },

  methods: {
    configure() {
      getConfigure().then(resp => {
        this.partner = resp.data.partner;
        this.goods = resp.data.goods;
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.submit();
    },
    handleCurrentChange(val) {
      this.currrent = val;
      this.submit();
    },
    submit() {
      this.loading = true;
      if (
        this.condition.datetime === null ||
        this.condition.datetime.length === 0
      ) {
        query(
          this.condition.goods,
          this.condition.partner,
          this.condition.inOrOut,
          this.currrent,
          this.size
        ).then(resp => {
          this.records = resp.data.records;
          this.totalCoast = resp.data.coastSum + resp.data.freightSum;
          this.coast = resp.data.coastSum;
          this.freight = resp.data.freightSum;
          this.total = resp.data.total;
          this.loading = false;
        });
      } else {
        queryWithTime(
          this.condition.datetime[0],
          this.condition.datetime[1],
          this.condition.goods,
          this.condition.partner,
          this.condition.inOrOut,
          this.currrent,
          this.size
        ).then(resp => {
          this.records = resp.data.records;
          this.totalCoast = resp.data.coastSum + resp.data.freightSum;
          this.coast = resp.data.coastSum;
          this.freight = resp.data.freightSum;
          this.total = resp.data.total;
          this.loading = false;
        });
      }
    },
    resetCondition() {
      this.condition.datetime = [];
      this.condition.goods = "任意";
      this.condition.partner = "任意";
      this.condition.inOrOut = "任意";
    },
    partnerMangager() {
      this.dialogAdd = "";
      this.dialogShow = true;
      this.dialogTitle = "伙伴";
      this.dialogList = this.partner;
    },
    goodsMangage() {
      this.dialogAdd = "";
      this.dialogShow = true;
      this.dialogTitle = "货物";
      this.dialogList = this.goods;
    },
    balanceManager() {
      this.balanceShow = true;
      this.balance = {
        goods: "任意",
        partner: "任意"
      };
      this.balanceQueryClick();
    },
    dialogListAdd() {
      var obj = {};
      obj.name = this.dialogAdd;
      if (this.dialogTitle === "伙伴") {
        this.partner.push(obj);
        this.dialogList = this.partner;
      }
      if (this.dialogTitle === "货物") {
        this.goods.push(obj);
        this.dialogList = this.goods;
      }
      updateConfigure(this.goods, this.partner);
    },
    dialogListRemove(val) {
      this.ensureShow = true;
      this.ensureTitle = "确定删除该记录？";
      this.ensureType = 2;
      this.ensureData = val;
    },
    addRecordManager() {
      this.addRecord = {
        time: "",
        goods: "",
        partner: "",
        inOrOut: "",
        univalent: "",
        count: "",
        freight: ""
      };
      this.addRecordShow = true;
      if (this.$refs.addRecordForm) {
        this.$refs.addRecordForm.resetFields();
      }
    },
    saveRecord() {
      this.$refs.addRecordForm.validate(valid => {
        if (valid) {
          save(this.addRecord);
          this.addRecordShow = false;
          this.submit();
        }
      });
    },
    removeRecord(val) {
      this.ensureShow = true;
      this.ensureTitle = "确定删除该记录？";
      this.ensureType = 1;
      this.ensureData = val;
    },
    balanceQueryClick() {
      this.balanceLoading = true;
      balanceQuery(this.balance.goods, this.balance.partner).then(resp => {
        this.balanceList = resp.data.balance;
        this.balanceLoading = false;
      });
    },
    balanceUpdate(val) {
      this.balanceUpdateShow = true;
      this.balanceUpdateForm.goods = val.goods;
      this.balanceUpdateForm.partner = val.partner;
      this.balanceUpdateForm.balance = val.balance;
      this.balanceUpdateForm.update = "";
      if (this.$refs.balanceForm) {
        this.$refs.balanceForm.resetFields();
      }
    },
    updateBalance() {
      this.$refs.balanceForm.validate(valid => {
        if (valid) {
          var update0 = 0;
          if (this.balanceUpdateForm.type === "减少") {
            update0 = 0 - this.balanceUpdateForm.update;
          } else {
            update0 = this.balanceUpdateForm.update;
          }
          balanceUpdate(
            this.balanceUpdateForm.goods,
            this.balanceUpdateForm.partner,
            update0
          );
          this.balanceUpdateShow = false;
        }
      });
    },
    cancel() {
      this.ensureShow = false;
    },
    ensure() {
      var val = this.ensureData;
      this.ensureShow = false;
      if (this.ensureType === 1) {
        remove(val.id).then(resp => {
          window.location.reload();
        });
      } else if (this.ensureType === 2) {
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
        updateConfigure(this.goods, this.partner);
      } else {
        //do nothing
      }
      this.ensureType = 0;
    }
  },
  mounted() {
    this.configure();
    this.submit();
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
  overflow: auto;
  max-height: 300px;
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
.balance {
  margin-top: 10px;
  margin-left: 10px;
  overflow: auto;
  max-height: 300px;
}
.balanceTop {
  margin-top: 10px;
  margin-left: 10px;
}
.balanceCenter {
  margin-top: 10px;
  margin-left: 10px;
  z: auto;
}
.addRecord {
  margin-top: 10px;
  margin-left: 10px;
  overflow: hidden;
  max-height: 500px;
}
</style>
