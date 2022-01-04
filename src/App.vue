<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" tag="h1">Bird Migration Energy</b-navbar-brand>
    </b-navbar>
    <b-container fluid>
      <b-row>
        <b-col class="sidebar bg-light p-4">
          <b-form>
            <label for="input-k">Induced power factor [-]</label>
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><vue-mathjax formula="$$k$$"></vue-mathjax
                ></b-input-group-text>
              </template>
              <b-form-input
                id="input-k"
                v-model="k"
                type="number"
                step=".1"
              ></b-form-input>
            </b-input-group>

            <label for="input-gcst">gravity constant [m.s<sup>-2</sup>]</label>
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><vue-mathjax formula="$$g$$"></vue-mathjax
                ></b-input-group-text>
              </template>
              <b-form-input
                id="input-gcst"
                v-model="gcst"
                type="number"
                step=".01"
              ></b-form-input>
            </b-input-group>

            <label for="input-airdens">Air density [-]</label>
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><vue-mathjax formula="$$\rho$$"></vue-mathjax
                ></b-input-group-text>
              </template>
              <b-form-input
                id="input-airdens"
                v-model="airdens"
                type="number"
                step=".1"
              ></b-form-input>
            </b-input-group>

            <label for="input-Sb">Body frontal area [m<sup>2</sup>]</label>
            <b-input-group size="sm">
              <template #prepend>
                <b-input-group-text
                  ><vue-mathjax formula="$$S_b$$"></vue-mathjax
                ></b-input-group-text>
              </template>
              <b-form-input
                id="input-Sb"
                v-model="Sb"
                type="text"
                disable
              ></b-form-input>
            </b-input-group>

            <label for="input-Cpro">Profile power constant</label>
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><vue-mathjax formula="$$C_{pro}$$"></vue-mathjax
                ></b-input-group-text>
              </template>
              <b-form-input
                id="input-Cpro"
                v-model="Cpro"
                type="number"
                step=".1"
              ></b-form-input>
            </b-input-group>

            <label for="input-CDb">Body drag coefficient [-]</label>
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><vue-mathjax formula="$$C_{Db}$$"></vue-mathjax
                ></b-input-group-text>
              </template>
              <b-form-input
                id="input-CDb"
                v-model="CDb"
                type="number"
                step=".1"
              ></b-form-input>
            </b-input-group>

            <label for="input-Ra">Aspect ratio</label>
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><vue-mathjax formula="$$R_a$$"></vue-mathjax
                ></b-input-group-text>
              </template>
              <b-form-input
                id="input-Ra"
                v-model="Ra"
                type="number"
                step=".1"
              ></b-form-input>
            </b-input-group>
          </b-form>
        </b-col>
        <b-col>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Tab 1" active>
                <b-card-text>
                  <div class="chart-container">
                  <line-chart :chart-data="chartData"></line-chart>
                  </div>

                  The total power curve is computed as
                  <vue-mathjax
                    formula="$$P = P_{mech} +  \frac{C_{pro}}{R_a}P_{am},$$"
                  ></vue-mathjax>
                  where the meachanical power is
                  <vue-mathjax
                    formula="$$P_{mech} = \frac{2k(mg)^2}{V_t\pi B^2\rho} + \frac{\rho V_t^3 S_b C_{Db}}{2}$$"
                  ></vue-mathjax>
                  and the  absolute minimum power
                  <vue-mathjax
                    formula="$$P_{am} = \frac{C_{pro}}{R_a} \frac{1.05k^{3/4}m^{3/2} g^{3/2} S_b^{1/4} C_{Db}^{1/4}}{\rho^{1/2}B^{3/2}}.$$"
                  ></vue-mathjax>
                </b-card-text>
              </b-tab>
              <b-tab title="Tab 2">
                <b-card-text>Tab contents 2</b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

import LineChart from "./LineChart.js";

import { VueMathjax } from "vue-mathjax";



export default {
  components: {
    LineChart,
    "vue-mathjax": VueMathjax,
  },
  data() {
    return {
      formula: "$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$",
      k: 1.2,
      gcst: 9.81,
      airdens: 1,
      CDb: 0.1,
      Cpro: 8.4,
      Ra: 7,
      Sb: "0.00813*m^0.666",
      m: 0.083,
      B: 0.34,
      pi: 3.14,
      species: [
        { species: "Willow Warbler", mass: 0.009, wing: 0.195 },
        { species: "Tree Pipit", mass: 0.0225, wing: 0.26 },
        { species: "Common Chiffchaff", mass: 0.0075, wing: 0.18 },
        { species: "Spotted Flycatcher", mass: 0.016, wing: 0.24 },
        { species: "Garden Warbler", mass: 0.0195, wing: 0.22 },
        { species: "Common Whitethroat", mass: 0.015, wing: 0.21 },
        { species: "European Pied Flycatcher", mass: 0.012, wing: 0.23 },
        { species: "Common Redstart", mass: 0.016, wing: 0.225 },
        { species: "Wood Warbler", mass: 0.0095, wing: 0.22 },
        { species: "Eurasian Blackcap", mass: 0.017, wing: 0.23 },
        { species: "Song Thrush", mass: 0.083, wing: 0.34 },
      ],
    };
  },
  methods: {},
  computed: {
    chartData : function () {
      var tmp = this
      var x = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
      var Sb=0.00813*Math.pow(tmp.m,0.666)
      var y = x.map(function(Vt){
        return (2*tmp.k*Math.pow(tmp.m*tmp.gcst,2))/(Vt*tmp.pi*Math.pow(tmp.B,2)) + tmp.airdens*Math.pow(Vt,3)*Sb*tmp.CDb/2 + tmp.Cpro/tmp.Ra*1.05*Math.pow(tmp.k,3/4)*Math.pow(tmp.m,3/2)*Math.pow(tmp.gcst,3/2)*Math.pow(Sb,1/4)*Math.pow(tmp.CDb,1/4)/Math.pow(tmp.airdens,1/2)/Math.pow(tmp.B,3/2)
      })

      return {"x":x, "y":y} 
    }
  }
};
</script>

<style>
.sidebar {
  -ms-flex: 0 0 300px;
  flex: 0 0 300px;
  box-shadow: inset -1px 0 0 rgb(0 0 0 / 10%);
}
.chart-container{
  /*height: 300px;*/
}
</style>
