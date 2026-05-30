import{D as yt,i as $t,b as at,n as st,d as vt,f as Gt,_ as E,a as X,c as Kt}from"./core.VxRkt30n.js";/**
 * @license MIT
 * Copyright (c) 2025–2026 matraic
 * See LICENSE file in the project root for full license text.
 *//**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _(t){return t<0?-1:t===0?0:1}function ct(t,e,r){return(1-r)*t+r*e}function Wt(t,e,r){return r<t?t:r>e?e:r}function bt(t,e,r){return r<t?t:r>e?e:r}function Pt(t){return t=t%360,t<0&&(t=t+360),t}function Dt(t,e){const r=t[0]*e[0][0]+t[1]*e[0][1]+t[2]*e[0][2],a=t[0]*e[1][0]+t[1]*e[1][1]+t[2]*e[1][2],o=t[0]*e[2][0]+t[1]*e[2][1]+t[2]*e[2][2];return[r,a,o]}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],Jt=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],Xt=[95.047,100,108.883];function Tt(t,e,r){return(255<<24|(t&255)<<16|(e&255)<<8|r&255)>>>0}function Lt(t){const e=tt(t[0]),r=tt(t[1]),a=tt(t[2]);return Tt(e,r,a)}function Ot(t){return t>>16&255}function _t(t){return t>>8&255}function zt(t){return t&255}function Zt(t,e,r){const a=Jt,o=a[0][0]*t+a[0][1]*e+a[0][2]*r,s=a[1][0]*t+a[1][1]*e+a[1][2]*r,i=a[2][0]*t+a[2][1]*e+a[2][2]*r,c=tt(o),l=tt(s),f=tt(i);return Tt(c,l,f)}function Qt(t){const e=ot(Ot(t)),r=ot(_t(t)),a=ot(zt(t));return Dt([e,r,a],jt)}function te(t){const e=W(t),r=tt(e);return Tt(r,r,r)}function Rt(t){const e=Qt(t)[1];return 116*Vt(e/100)-16}function W(t){return 100*re((t+16)/116)}function wt(t){return Vt(t/100)*116-16}function ot(t){const e=t/255;return e<=.040449936?e/12.92*100:Math.pow((e+.055)/1.055,2.4)*100}function tt(t){const e=t/100;let r=0;return e<=.0031308?r=e*12.92:r=1.055*Math.pow(e,1/2.4)-.055,Wt(0,255,Math.round(r*255))}function ee(){return Xt}function Vt(t){const e=.008856451679035631,r=24389/27;return t>e?Math.pow(t,1/3):(r*t+16)/116}function re(t){const e=.008856451679035631,r=24389/27,a=t*t*t;return a>e?a:(116*t-16)/r}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{static make(e=ee(),r=200/Math.PI*W(50)/100,a=50,o=2,s=!1){const i=e,c=i[0]*.401288+i[1]*.650173+i[2]*-.051461,l=i[0]*-.250268+i[1]*1.204414+i[2]*.045854,f=i[0]*-.002079+i[1]*.048952+i[2]*.953127,h=.8+o/10,g=h>=.9?ct(.59,.69,(h-.9)*10):ct(.525,.59,(h-.8)*10);let y=s?1:h*(1-1/3.6*Math.exp((-r-42)/92));y=y>1?1:y<0?0:y;const M=h,P=[y*(100/c)+1-y,y*(100/l)+1-y,y*(100/f)+1-y],p=1/(5*r+1),C=p*p*p*p,I=1-C,w=C*r+.1*I*I*Math.cbrt(5*r),k=W(a)/e[1],S=1.48+Math.sqrt(k),b=.725/Math.pow(k,.2),B=b,A=[Math.pow(w*P[0]*c/100,.42),Math.pow(w*P[1]*l/100,.42),Math.pow(w*P[2]*f/100,.42)],x=[400*A[0]/(A[0]+27.13),400*A[1]/(A[1]+27.13),400*A[2]/(A[2]+27.13)],R=(2*x[0]+x[1]+.05*x[2])*b;return new U(k,R,b,B,g,M,P,w,Math.pow(w,.25),S)}constructor(e,r,a,o,s,i,c,l,f,h){this.n=e,this.aw=r,this.nbb=a,this.ncb=o,this.c=s,this.nc=i,this.rgbD=c,this.fl=l,this.fLRoot=f,this.z=h}}U.DEFAULT=U.make();/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e,r,a,o,s,i,c,l,f){this.hue=e,this.chroma=r,this.j=a,this.q=o,this.m=s,this.s=i,this.jstar=c,this.astar=l,this.bstar=f}distance(e){const r=this.jstar-e.jstar,a=this.astar-e.astar,o=this.bstar-e.bstar,s=Math.sqrt(r*r+a*a+o*o);return 1.41*Math.pow(s,.63)}static fromInt(e){return V.fromIntInViewingConditions(e,U.DEFAULT)}static fromIntInViewingConditions(e,r){const a=(e&16711680)>>16,o=(e&65280)>>8,s=e&255,i=ot(a),c=ot(o),l=ot(s),f=.41233895*i+.35762064*c+.18051042*l,h=.2126*i+.7152*c+.0722*l,g=.01932141*i+.11916382*c+.95034478*l,y=.401288*f+.650173*h-.051461*g,M=-.250268*f+1.204414*h+.045854*g,P=-.002079*f+.048952*h+.953127*g,p=r.rgbD[0]*y,C=r.rgbD[1]*M,I=r.rgbD[2]*P,w=Math.pow(r.fl*Math.abs(p)/100,.42),k=Math.pow(r.fl*Math.abs(C)/100,.42),S=Math.pow(r.fl*Math.abs(I)/100,.42),b=_(p)*400*w/(w+27.13),B=_(C)*400*k/(k+27.13),A=_(I)*400*S/(S+27.13),x=(11*b+-12*B+A)/11,R=(b+B-2*A)/9,T=(20*b+20*B+21*A)/20,Y=(40*b+20*B+A)/20,H=Math.atan2(R,x)*180/Math.PI,q=H<0?H+360:H>=360?H-360:H,ft=q*Math.PI/180,mt=Y*r.nbb,K=100*Math.pow(mt/r.aw,r.c*r.z),dt=4/r.c*Math.sqrt(K/100)*(r.aw+4)*r.fLRoot,kt=q<20.14?q+360:q,Mt=.25*(Math.cos(kt*Math.PI/180+2)+3.8),At=5e4/13*Mt*r.nc*r.ncb*Math.sqrt(x*x+R*R)/(T+.305),gt=Math.pow(At,.9)*Math.pow(1.64-Math.pow(.29,r.n),.73),xt=gt*Math.sqrt(K/100),Bt=xt*r.fLRoot,qt=50*Math.sqrt(gt*r.c/(r.aw+4)),Ht=(1+100*.007)*K/(1+.007*K),Et=1/.0228*Math.log(1+.0228*Bt),Ut=Et*Math.cos(ft),Yt=Et*Math.sin(ft);return new V(q,xt,K,dt,Bt,qt,Ht,Ut,Yt)}static fromJch(e,r,a){return V.fromJchInViewingConditions(e,r,a,U.DEFAULT)}static fromJchInViewingConditions(e,r,a,o){const s=4/o.c*Math.sqrt(e/100)*(o.aw+4)*o.fLRoot,i=r*o.fLRoot,c=r/Math.sqrt(e/100),l=50*Math.sqrt(c*o.c/(o.aw+4)),f=a*Math.PI/180,h=(1+100*.007)*e/(1+.007*e),g=1/.0228*Math.log(1+.0228*i),y=g*Math.cos(f),M=g*Math.sin(f);return new V(a,r,e,s,i,l,h,y,M)}static fromUcs(e,r,a){return V.fromUcsInViewingConditions(e,r,a,U.DEFAULT)}static fromUcsInViewingConditions(e,r,a,o){const s=r,i=a,c=Math.sqrt(s*s+i*i),f=(Math.exp(c*.0228)-1)/.0228/o.fLRoot;let h=Math.atan2(i,s)*(180/Math.PI);h<0&&(h+=360);const g=e/(1-(e-100)*.007);return V.fromJchInViewingConditions(g,f,h,o)}toInt(){return this.viewed(U.DEFAULT)}viewed(e){const r=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),a=Math.pow(r/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),o=this.hue*Math.PI/180,s=.25*(Math.cos(o+2)+3.8),i=e.aw*Math.pow(this.j/100,1/e.c/e.z),c=s*(5e4/13)*e.nc*e.ncb,l=i/e.nbb,f=Math.sin(o),h=Math.cos(o),g=23*(l+.305)*a/(23*c+11*a*h+108*a*f),y=g*h,M=g*f,P=(460*l+451*y+288*M)/1403,p=(460*l-891*y-261*M)/1403,C=(460*l-220*y-6300*M)/1403,I=Math.max(0,27.13*Math.abs(P)/(400-Math.abs(P))),w=_(P)*(100/e.fl)*Math.pow(I,1/.42),k=Math.max(0,27.13*Math.abs(p)/(400-Math.abs(p))),S=_(p)*(100/e.fl)*Math.pow(k,1/.42),b=Math.max(0,27.13*Math.abs(C)/(400-Math.abs(C))),B=_(C)*(100/e.fl)*Math.pow(b,1/.42),A=w/e.rgbD[0],x=S/e.rgbD[1],R=B/e.rgbD[2],T=1.86206786*A-1.01125463*x+.14918677*R,Y=.38752654*A+.62144744*x-.00897398*R,G=-.0158415*A-.03412294*x+1.04996444*R;return Zt(T,Y,G)}static fromXyzInViewingConditions(e,r,a,o){const s=.401288*e+.650173*r-.051461*a,i=-.250268*e+1.204414*r+.045854*a,c=-.002079*e+.048952*r+.953127*a,l=o.rgbD[0]*s,f=o.rgbD[1]*i,h=o.rgbD[2]*c,g=Math.pow(o.fl*Math.abs(l)/100,.42),y=Math.pow(o.fl*Math.abs(f)/100,.42),M=Math.pow(o.fl*Math.abs(h)/100,.42),P=_(l)*400*g/(g+27.13),p=_(f)*400*y/(y+27.13),C=_(h)*400*M/(M+27.13),I=(11*P+-12*p+C)/11,w=(P+p-2*C)/9,k=(20*P+20*p+21*C)/20,S=(40*P+20*p+C)/20,B=Math.atan2(w,I)*180/Math.PI,A=B<0?B+360:B>=360?B-360:B,x=A*Math.PI/180,R=S*o.nbb,T=100*Math.pow(R/o.aw,o.c*o.z),Y=4/o.c*Math.sqrt(T/100)*(o.aw+4)*o.fLRoot,G=A<20.14?A+360:A,H=1/4*(Math.cos(G*Math.PI/180+2)+3.8),ft=5e4/13*H*o.nc*o.ncb*Math.sqrt(I*I+w*w)/(k+.305),mt=Math.pow(ft,.9)*Math.pow(1.64-Math.pow(.29,o.n),.73),K=mt*Math.sqrt(T/100),dt=K*o.fLRoot,kt=50*Math.sqrt(mt*o.c/(o.aw+4)),Mt=(1+100*.007)*T/(1+.007*T),Ct=Math.log(1+.0228*dt)/.0228,At=Ct*Math.cos(x),gt=Ct*Math.sin(x);return new V(A,K,T,Y,dt,kt,Mt,At,gt)}xyzInViewingConditions(e){const r=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),a=Math.pow(r/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),o=this.hue*Math.PI/180,s=.25*(Math.cos(o+2)+3.8),i=e.aw*Math.pow(this.j/100,1/e.c/e.z),c=s*(5e4/13)*e.nc*e.ncb,l=i/e.nbb,f=Math.sin(o),h=Math.cos(o),g=23*(l+.305)*a/(23*c+11*a*h+108*a*f),y=g*h,M=g*f,P=(460*l+451*y+288*M)/1403,p=(460*l-891*y-261*M)/1403,C=(460*l-220*y-6300*M)/1403,I=Math.max(0,27.13*Math.abs(P)/(400-Math.abs(P))),w=_(P)*(100/e.fl)*Math.pow(I,1/.42),k=Math.max(0,27.13*Math.abs(p)/(400-Math.abs(p))),S=_(p)*(100/e.fl)*Math.pow(k,1/.42),b=Math.max(0,27.13*Math.abs(C)/(400-Math.abs(C))),B=_(C)*(100/e.fl)*Math.pow(b,1/.42),A=w/e.rgbD[0],x=S/e.rgbD[1],R=B/e.rgbD[2],T=1.86206786*A-1.01125463*x+.14918677*R,Y=.38752654*A+.62144744*x-.00897398*R,G=-.0158415*A-.03412294*x+1.04996444*R;return[T,Y,G]}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m{static sanitizeRadians(e){return(e+Math.PI*8)%(Math.PI*2)}static trueDelinearized(e){const r=e/100;let a=0;return r<=.0031308?a=r*12.92:a=1.055*Math.pow(r,1/2.4)-.055,a*255}static chromaticAdaptation(e){const r=Math.pow(Math.abs(e),.42);return _(e)*400*r/(r+27.13)}static hueOf(e){const r=Dt(e,m.SCALED_DISCOUNT_FROM_LINRGB),a=m.chromaticAdaptation(r[0]),o=m.chromaticAdaptation(r[1]),s=m.chromaticAdaptation(r[2]),i=(11*a+-12*o+s)/11,c=(a+o-2*s)/9;return Math.atan2(c,i)}static areInCyclicOrder(e,r,a){const o=m.sanitizeRadians(r-e),s=m.sanitizeRadians(a-e);return o<s}static intercept(e,r,a){return(r-e)/(a-e)}static lerpPoint(e,r,a){return[e[0]+(a[0]-e[0])*r,e[1]+(a[1]-e[1])*r,e[2]+(a[2]-e[2])*r]}static setCoordinate(e,r,a,o){const s=m.intercept(e[o],r,a[o]);return m.lerpPoint(e,s,a)}static isBounded(e){return 0<=e&&e<=100}static nthVertex(e,r){const a=m.Y_FROM_LINRGB[0],o=m.Y_FROM_LINRGB[1],s=m.Y_FROM_LINRGB[2],i=r%4<=1?0:100,c=r%2===0?0:100;if(r<4){const l=i,f=c,h=(e-l*o-f*s)/a;return m.isBounded(h)?[h,l,f]:[-1,-1,-1]}else if(r<8){const l=i,f=c,h=(e-f*a-l*s)/o;return m.isBounded(h)?[f,h,l]:[-1,-1,-1]}else{const l=i,f=c,h=(e-l*a-f*o)/s;return m.isBounded(h)?[l,f,h]:[-1,-1,-1]}}static bisectToSegment(e,r){let a=[-1,-1,-1],o=a,s=0,i=0,c=!1,l=!0;for(let f=0;f<12;f++){const h=m.nthVertex(e,f);if(h[0]<0)continue;const g=m.hueOf(h);if(!c){a=h,o=h,s=g,i=g,c=!0;continue}(l||m.areInCyclicOrder(s,g,i))&&(l=!1,m.areInCyclicOrder(s,r,g)?(o=h,i=g):(a=h,s=g))}return[a,o]}static midpoint(e,r){return[(e[0]+r[0])/2,(e[1]+r[1])/2,(e[2]+r[2])/2]}static criticalPlaneBelow(e){return Math.floor(e-.5)}static criticalPlaneAbove(e){return Math.ceil(e-.5)}static bisectToLimit(e,r){const a=m.bisectToSegment(e,r);let o=a[0],s=m.hueOf(o),i=a[1];for(let c=0;c<3;c++)if(o[c]!==i[c]){let l=-1,f=255;o[c]<i[c]?(l=m.criticalPlaneBelow(m.trueDelinearized(o[c])),f=m.criticalPlaneAbove(m.trueDelinearized(i[c]))):(l=m.criticalPlaneAbove(m.trueDelinearized(o[c])),f=m.criticalPlaneBelow(m.trueDelinearized(i[c])));for(let h=0;h<8&&!(Math.abs(f-l)<=1);h++){const g=Math.floor((l+f)/2),y=m.CRITICAL_PLANES[g],M=m.setCoordinate(o,y,i,c),P=m.hueOf(M);m.areInCyclicOrder(s,r,P)?(i=M,f=g):(o=M,s=P,l=g)}}return m.midpoint(o,i)}static inverseChromaticAdaptation(e){const r=Math.abs(e),a=Math.max(0,27.13*r/(400-r));return _(e)*Math.pow(a,1/.42)}static findResultByJ(e,r,a){let o=Math.sqrt(a)*11;const s=U.DEFAULT,i=1/Math.pow(1.64-Math.pow(.29,s.n),.73),l=.25*(Math.cos(e+2)+3.8)*(5e4/13)*s.nc*s.ncb,f=Math.sin(e),h=Math.cos(e);for(let g=0;g<5;g++){const y=o/100,M=r===0||o===0?0:r/Math.sqrt(y),P=Math.pow(M*i,1/.9),C=s.aw*Math.pow(y,1/s.c/s.z)/s.nbb,I=23*(C+.305)*P/(23*l+11*P*h+108*P*f),w=I*h,k=I*f,S=(460*C+451*w+288*k)/1403,b=(460*C-891*w-261*k)/1403,B=(460*C-220*w-6300*k)/1403,A=m.inverseChromaticAdaptation(S),x=m.inverseChromaticAdaptation(b),R=m.inverseChromaticAdaptation(B),T=Dt([A,x,R],m.LINRGB_FROM_SCALED_DISCOUNT);if(T[0]<0||T[1]<0||T[2]<0)return 0;const Y=m.Y_FROM_LINRGB[0],G=m.Y_FROM_LINRGB[1],H=m.Y_FROM_LINRGB[2],q=Y*T[0]+G*T[1]+H*T[2];if(q<=0)return 0;if(g===4||Math.abs(q-a)<.002)return T[0]>100.01||T[1]>100.01||T[2]>100.01?0:Lt(T);o=o-(q-a)*o/(2*q)}return 0}static solveToInt(e,r,a){if(r<1e-4||a<1e-4||a>99.9999)return te(a);e=Pt(e);const o=e/180*Math.PI,s=W(a),i=m.findResultByJ(o,r,s);if(i!==0)return i;const c=m.bisectToLimit(s,o);return Lt(c)}static solveToCam(e,r,a){return V.fromInt(m.solveToInt(e,r,a))}}m.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,.0002795742885861124],[.0005891086651375999,.0029785502573438758,.0003270666104008398],[.00010146692491640572,.0005364214359186694,.0032979401770712076]];m.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]];m.Y_FROM_LINRGB=[.2126,.7152,.0722];m.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{static from(e,r,a){return new O(m.solveToInt(e,r,a))}static fromInt(e){return new O(e)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(e){this.setInternalState(m.solveToInt(e,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(e){this.setInternalState(m.solveToInt(this.internalHue,e,this.internalTone))}get tone(){return this.internalTone}set tone(e){this.setInternalState(m.solveToInt(this.internalHue,this.internalChroma,e))}constructor(e){this.argb=e;const r=V.fromInt(e);this.internalHue=r.hue,this.internalChroma=r.chroma,this.internalTone=Rt(e),this.argb=e}setInternalState(e){const r=V.fromInt(e);this.internalHue=r.hue,this.internalChroma=r.chroma,this.internalTone=Rt(e),this.argb=e}inViewingConditions(e){const a=V.fromInt(this.toInt()).xyzInViewingConditions(e),o=V.fromXyzInViewingConditions(a[0],a[1],a[2],U.make());return O.from(o.hue,o.chroma,wt(a[1]))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static ratioOfTones(e,r){return e=bt(0,100,e),r=bt(0,100,r),L.ratioOfYs(W(e),W(r))}static ratioOfYs(e,r){const a=e>r?e:r,o=a===r?e:r;return(a+5)/(o+5)}static lighter(e,r){if(e<0||e>100)return-1;const a=W(e),o=r*(a+5)-5,s=L.ratioOfYs(o,a),i=Math.abs(s-r);if(s<r&&i>.04)return-1;const c=wt(o)+.4;return c<0||c>100?-1:c}static darker(e,r){if(e<0||e>100)return-1;const a=W(e),o=(a+5)/r-5,s=L.ratioOfYs(a,o),i=Math.abs(s-r);if(s<r&&i>.04)return-1;const c=wt(o)-.4;return c<0||c>100?-1:c}static lighterUnsafe(e,r){const a=L.lighter(e,r);return a<0?100:a}static darkerUnsafe(e,r){const a=L.darker(e,r);return a<0?0:a}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{static isDisliked(e){const r=Math.round(e.hue)>=90&&Math.round(e.hue)<=111,a=Math.round(e.chroma)>16,o=Math.round(e.tone)<65;return r&&a&&o}static fixIfDisliked(e){return It.isDisliked(e)?O.from(e.hue,e.chroma,70):e}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u{static fromPalette(e){return new u(e.name??"",e.palette,e.tone,e.isBackground??!1,e.background,e.secondBackground,e.contrastCurve,e.toneDeltaPair)}constructor(e,r,a,o,s,i,c,l){if(this.name=e,this.palette=r,this.tone=a,this.isBackground=o,this.background=s,this.secondBackground=i,this.contrastCurve=c,this.toneDeltaPair=l,this.hctCache=new Map,!s&&i)throw new Error(`Color ${e} has secondBackgrounddefined, but background is not defined.`);if(!s&&c)throw new Error(`Color ${e} has contrastCurvedefined, but background is not defined.`);if(s&&!c)throw new Error(`Color ${e} has backgrounddefined, but contrastCurve is not defined.`)}getArgb(e){return this.getHct(e).toInt()}getHct(e){const r=this.hctCache.get(e);if(r!=null)return r;const a=this.getTone(e),o=this.palette(e).getHct(a);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(e,o),o}getTone(e){const r=e.contrastLevel<0;if(this.toneDeltaPair){const a=this.toneDeltaPair(e),o=a.roleA,s=a.roleB,i=a.delta,c=a.polarity,l=a.stayTogether,h=this.background(e).getTone(e),g=c==="nearer"||c==="lighter"&&!e.isDark||c==="darker"&&e.isDark,y=g?o:s,M=g?s:o,P=this.name===y.name,p=e.isDark?1:-1,C=y.contrastCurve.get(e.contrastLevel),I=M.contrastCurve.get(e.contrastLevel),w=y.tone(e);let k=L.ratioOfTones(h,w)>=C?w:u.foregroundTone(h,C);const S=M.tone(e);let b=L.ratioOfTones(h,S)>=I?S:u.foregroundTone(h,I);return r&&(k=u.foregroundTone(h,C),b=u.foregroundTone(h,I)),(b-k)*p>=i||(b=bt(0,100,k+i*p),(b-k)*p>=i||(k=bt(0,100,b-i*p))),50<=k&&k<60?p>0?(k=60,b=Math.max(b,k+i*p)):(k=49,b=Math.min(b,k+i*p)):50<=b&&b<60&&(l?p>0?(k=60,b=Math.max(b,k+i*p)):(k=49,b=Math.min(b,k+i*p)):p>0?b=60:b=49),P?k:b}else{let a=this.tone(e);if(this.background==null)return a;const o=this.background(e).getTone(e),s=this.contrastCurve.get(e.contrastLevel);if(L.ratioOfTones(o,a)>=s||(a=u.foregroundTone(o,s)),r&&(a=u.foregroundTone(o,s)),this.isBackground&&50<=a&&a<60&&(L.ratioOfTones(49,o)>=s?a=49:a=60),this.secondBackground){const[i,c]=[this.background,this.secondBackground],[l,f]=[i(e).getTone(e),c(e).getTone(e)],[h,g]=[Math.max(l,f),Math.min(l,f)];if(L.ratioOfTones(h,a)>=s&&L.ratioOfTones(g,a)>=s)return a;const y=L.lighter(h,s),M=L.darker(g,s),P=[];return y!==-1&&P.push(y),M!==-1&&P.push(M),u.tonePrefersLightForeground(l)||u.tonePrefersLightForeground(f)?y<0?100:y:P.length===1?P[0]:M<0?0:M}return a}}static foregroundTone(e,r){const a=L.lighterUnsafe(e,r),o=L.darkerUnsafe(e,r),s=L.ratioOfTones(a,e),i=L.ratioOfTones(o,e);if(u.tonePrefersLightForeground(e)){const l=Math.abs(s-i)<.1&&s<r&&i<r;return s>=r||s>=i||l?a:o}else return i>=r||i>=s?o:a}static tonePrefersLightForeground(e){return Math.round(e)<60}static toneAllowsLightForeground(e){return Math.round(e)<=49}static enableLightForeground(e){return u.tonePrefersLightForeground(e)&&!u.toneAllowsLightForeground(e)?49:e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{static fromInt(e){const r=O.fromInt(e);return D.fromHct(r)}static fromHct(e){return new D(e.hue,e.chroma,e)}static fromHueAndChroma(e,r){const a=new ae(e,r).create();return new D(e,r,a)}constructor(e,r,a){this.hue=e,this.chroma=r,this.keyColor=a,this.cache=new Map}tone(e){let r=this.cache.get(e);return r===void 0&&(r=O.from(this.hue,this.chroma,e).toInt(),this.cache.set(e,r)),r}getHct(e){return O.fromInt(this.tone(e))}}class ae{constructor(e,r){this.hue=e,this.requestedChroma=r,this.chromaCache=new Map,this.maxChromaValue=200}create(){let o=0,s=100;for(;o<s;){const i=Math.floor((o+s)/2),c=this.maxChroma(i)<this.maxChroma(i+1);if(this.maxChroma(i)>=this.requestedChroma-.01)if(Math.abs(o-50)<Math.abs(s-50))s=i;else{if(o===i)return O.from(this.hue,this.requestedChroma,o);o=i}else c?o=i+1:s=i}return O.from(this.hue,this.requestedChroma,o)}maxChroma(e){if(this.chromaCache.has(e))return this.chromaCache.get(e);const r=O.from(this.hue,this.maxChromaValue,e).chroma;return this.chromaCache.set(e,r),r}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d{constructor(e,r,a,o){this.low=e,this.normal=r,this.medium=a,this.high=o}get(e){return e<=-1?this.low:e<0?ct(this.low,this.normal,(e- -1)/1):e<.5?ct(this.normal,this.medium,(e-0)/.5):e<1?ct(this.medium,this.high,(e-.5)/.5):this.high}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e,r,a,o,s){this.roleA=e,this.roleB=r,this.delta=a,this.polarity=o,this.stayTogether=s}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rt;(function(t){t[t.MONOCHROME=0]="MONOCHROME",t[t.NEUTRAL=1]="NEUTRAL",t[t.TONAL_SPOT=2]="TONAL_SPOT",t[t.VIBRANT=3]="VIBRANT",t[t.EXPRESSIVE=4]="EXPRESSIVE",t[t.FIDELITY=5]="FIDELITY",t[t.CONTENT=6]="CONTENT",t[t.RAINBOW=7]="RAINBOW",t[t.FRUIT_SALAD=8]="FRUIT_SALAD"})(rt||(rt={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(t){return t.variant===rt.FIDELITY||t.variant===rt.CONTENT}function F(t){return t.variant===rt.MONOCHROME}function ne(t,e,r,a){let o=r,s=O.from(t,e,r);if(s.chroma<e){let i=s.chroma;for(;s.chroma<e;){o+=a?-1:1;const c=O.from(t,e,o);if(i>c.chroma||Math.abs(c.chroma-e)<.4)break;const l=Math.abs(c.chroma-e),f=Math.abs(s.chroma-e);l<f&&(s=c),i=Math.max(i,c.chroma)}}return o}class n{static highestSurface(e){return e.isDark?n.surfaceBright:n.surfaceDim}}n.contentAccentToneDelta=15;n.primaryPaletteKeyColor=u.fromPalette({name:"primary_palette_key_color",palette:t=>t.primaryPalette,tone:t=>t.primaryPalette.keyColor.tone});n.secondaryPaletteKeyColor=u.fromPalette({name:"secondary_palette_key_color",palette:t=>t.secondaryPalette,tone:t=>t.secondaryPalette.keyColor.tone});n.tertiaryPaletteKeyColor=u.fromPalette({name:"tertiary_palette_key_color",palette:t=>t.tertiaryPalette,tone:t=>t.tertiaryPalette.keyColor.tone});n.neutralPaletteKeyColor=u.fromPalette({name:"neutral_palette_key_color",palette:t=>t.neutralPalette,tone:t=>t.neutralPalette.keyColor.tone});n.neutralVariantPaletteKeyColor=u.fromPalette({name:"neutral_variant_palette_key_color",palette:t=>t.neutralVariantPalette,tone:t=>t.neutralVariantPalette.keyColor.tone});n.background=u.fromPalette({name:"background",palette:t=>t.neutralPalette,tone:t=>t.isDark?6:98,isBackground:!0});n.onBackground=u.fromPalette({name:"on_background",palette:t=>t.neutralPalette,tone:t=>t.isDark?90:10,background:t=>n.background,contrastCurve:new d(3,3,4.5,7)});n.surface=u.fromPalette({name:"surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?6:98,isBackground:!0});n.surfaceDim=u.fromPalette({name:"surface_dim",palette:t=>t.neutralPalette,tone:t=>t.isDark?6:new d(87,87,80,75).get(t.contrastLevel),isBackground:!0});n.surfaceBright=u.fromPalette({name:"surface_bright",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(24,24,29,34).get(t.contrastLevel):98,isBackground:!0});n.surfaceContainerLowest=u.fromPalette({name:"surface_container_lowest",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(4,4,2,0).get(t.contrastLevel):100,isBackground:!0});n.surfaceContainerLow=u.fromPalette({name:"surface_container_low",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(10,10,11,12).get(t.contrastLevel):new d(96,96,96,95).get(t.contrastLevel),isBackground:!0});n.surfaceContainer=u.fromPalette({name:"surface_container",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(12,12,16,20).get(t.contrastLevel):new d(94,94,92,90).get(t.contrastLevel),isBackground:!0});n.surfaceContainerHigh=u.fromPalette({name:"surface_container_high",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(17,17,21,25).get(t.contrastLevel):new d(92,92,88,85).get(t.contrastLevel),isBackground:!0});n.surfaceContainerHighest=u.fromPalette({name:"surface_container_highest",palette:t=>t.neutralPalette,tone:t=>t.isDark?new d(22,22,26,30).get(t.contrastLevel):new d(90,90,84,80).get(t.contrastLevel),isBackground:!0});n.onSurface=u.fromPalette({name:"on_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?90:10,background:t=>n.highestSurface(t),contrastCurve:new d(4.5,7,11,21)});n.surfaceVariant=u.fromPalette({name:"surface_variant",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?30:90,isBackground:!0});n.onSurfaceVariant=u.fromPalette({name:"on_surface_variant",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?80:30,background:t=>n.highestSurface(t),contrastCurve:new d(3,4.5,7,11)});n.inverseSurface=u.fromPalette({name:"inverse_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?90:20});n.inverseOnSurface=u.fromPalette({name:"inverse_on_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?20:95,background:t=>n.inverseSurface,contrastCurve:new d(4.5,7,11,21)});n.outline=u.fromPalette({name:"outline",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?60:50,background:t=>n.highestSurface(t),contrastCurve:new d(1.5,3,4.5,7)});n.outlineVariant=u.fromPalette({name:"outline_variant",palette:t=>t.neutralVariantPalette,tone:t=>t.isDark?30:80,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5)});n.shadow=u.fromPalette({name:"shadow",palette:t=>t.neutralPalette,tone:t=>0});n.scrim=u.fromPalette({name:"scrim",palette:t=>t.neutralPalette,tone:t=>0});n.surfaceTint=u.fromPalette({name:"surface_tint",palette:t=>t.primaryPalette,tone:t=>t.isDark?80:40,isBackground:!0});n.primary=u.fromPalette({name:"primary",palette:t=>t.primaryPalette,tone:t=>F(t)?t.isDark?100:0:t.isDark?80:40,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(3,4.5,7,7),toneDeltaPair:t=>new z(n.primaryContainer,n.primary,10,"nearer",!1)});n.onPrimary=u.fromPalette({name:"on_primary",palette:t=>t.primaryPalette,tone:t=>F(t)?t.isDark?10:90:t.isDark?20:100,background:t=>n.primary,contrastCurve:new d(4.5,7,11,21)});n.primaryContainer=u.fromPalette({name:"primary_container",palette:t=>t.primaryPalette,tone:t=>it(t)?t.sourceColorHct.tone:F(t)?t.isDark?85:25:t.isDark?30:90,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.primaryContainer,n.primary,10,"nearer",!1)});n.onPrimaryContainer=u.fromPalette({name:"on_primary_container",palette:t=>t.primaryPalette,tone:t=>it(t)?u.foregroundTone(n.primaryContainer.tone(t),4.5):F(t)?t.isDark?0:100:t.isDark?90:30,background:t=>n.primaryContainer,contrastCurve:new d(3,4.5,7,11)});n.inversePrimary=u.fromPalette({name:"inverse_primary",palette:t=>t.primaryPalette,tone:t=>t.isDark?40:80,background:t=>n.inverseSurface,contrastCurve:new d(3,4.5,7,7)});n.secondary=u.fromPalette({name:"secondary",palette:t=>t.secondaryPalette,tone:t=>t.isDark?80:40,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(3,4.5,7,7),toneDeltaPair:t=>new z(n.secondaryContainer,n.secondary,10,"nearer",!1)});n.onSecondary=u.fromPalette({name:"on_secondary",palette:t=>t.secondaryPalette,tone:t=>F(t)?t.isDark?10:100:t.isDark?20:100,background:t=>n.secondary,contrastCurve:new d(4.5,7,11,21)});n.secondaryContainer=u.fromPalette({name:"secondary_container",palette:t=>t.secondaryPalette,tone:t=>{const e=t.isDark?30:90;return F(t)?t.isDark?30:85:it(t)?ne(t.secondaryPalette.hue,t.secondaryPalette.chroma,e,!t.isDark):e},isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.secondaryContainer,n.secondary,10,"nearer",!1)});n.onSecondaryContainer=u.fromPalette({name:"on_secondary_container",palette:t=>t.secondaryPalette,tone:t=>F(t)?t.isDark?90:10:it(t)?u.foregroundTone(n.secondaryContainer.tone(t),4.5):t.isDark?90:30,background:t=>n.secondaryContainer,contrastCurve:new d(3,4.5,7,11)});n.tertiary=u.fromPalette({name:"tertiary",palette:t=>t.tertiaryPalette,tone:t=>F(t)?t.isDark?90:25:t.isDark?80:40,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(3,4.5,7,7),toneDeltaPair:t=>new z(n.tertiaryContainer,n.tertiary,10,"nearer",!1)});n.onTertiary=u.fromPalette({name:"on_tertiary",palette:t=>t.tertiaryPalette,tone:t=>F(t)?t.isDark?10:90:t.isDark?20:100,background:t=>n.tertiary,contrastCurve:new d(4.5,7,11,21)});n.tertiaryContainer=u.fromPalette({name:"tertiary_container",palette:t=>t.tertiaryPalette,tone:t=>{if(F(t))return t.isDark?60:49;if(!it(t))return t.isDark?30:90;const e=t.tertiaryPalette.getHct(t.sourceColorHct.tone);return It.fixIfDisliked(e).tone},isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.tertiaryContainer,n.tertiary,10,"nearer",!1)});n.onTertiaryContainer=u.fromPalette({name:"on_tertiary_container",palette:t=>t.tertiaryPalette,tone:t=>F(t)?t.isDark?0:100:it(t)?u.foregroundTone(n.tertiaryContainer.tone(t),4.5):t.isDark?90:30,background:t=>n.tertiaryContainer,contrastCurve:new d(3,4.5,7,11)});n.error=u.fromPalette({name:"error",palette:t=>t.errorPalette,tone:t=>t.isDark?80:40,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(3,4.5,7,7),toneDeltaPair:t=>new z(n.errorContainer,n.error,10,"nearer",!1)});n.onError=u.fromPalette({name:"on_error",palette:t=>t.errorPalette,tone:t=>t.isDark?20:100,background:t=>n.error,contrastCurve:new d(4.5,7,11,21)});n.errorContainer=u.fromPalette({name:"error_container",palette:t=>t.errorPalette,tone:t=>t.isDark?30:90,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.errorContainer,n.error,10,"nearer",!1)});n.onErrorContainer=u.fromPalette({name:"on_error_container",palette:t=>t.errorPalette,tone:t=>F(t)?t.isDark?90:10:t.isDark?90:30,background:t=>n.errorContainer,contrastCurve:new d(3,4.5,7,11)});n.primaryFixed=u.fromPalette({name:"primary_fixed",palette:t=>t.primaryPalette,tone:t=>F(t)?40:90,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.primaryFixed,n.primaryFixedDim,10,"lighter",!0)});n.primaryFixedDim=u.fromPalette({name:"primary_fixed_dim",palette:t=>t.primaryPalette,tone:t=>F(t)?30:80,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.primaryFixed,n.primaryFixedDim,10,"lighter",!0)});n.onPrimaryFixed=u.fromPalette({name:"on_primary_fixed",palette:t=>t.primaryPalette,tone:t=>F(t)?100:10,background:t=>n.primaryFixedDim,secondBackground:t=>n.primaryFixed,contrastCurve:new d(4.5,7,11,21)});n.onPrimaryFixedVariant=u.fromPalette({name:"on_primary_fixed_variant",palette:t=>t.primaryPalette,tone:t=>F(t)?90:30,background:t=>n.primaryFixedDim,secondBackground:t=>n.primaryFixed,contrastCurve:new d(3,4.5,7,11)});n.secondaryFixed=u.fromPalette({name:"secondary_fixed",palette:t=>t.secondaryPalette,tone:t=>F(t)?80:90,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.secondaryFixed,n.secondaryFixedDim,10,"lighter",!0)});n.secondaryFixedDim=u.fromPalette({name:"secondary_fixed_dim",palette:t=>t.secondaryPalette,tone:t=>F(t)?70:80,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.secondaryFixed,n.secondaryFixedDim,10,"lighter",!0)});n.onSecondaryFixed=u.fromPalette({name:"on_secondary_fixed",palette:t=>t.secondaryPalette,tone:t=>10,background:t=>n.secondaryFixedDim,secondBackground:t=>n.secondaryFixed,contrastCurve:new d(4.5,7,11,21)});n.onSecondaryFixedVariant=u.fromPalette({name:"on_secondary_fixed_variant",palette:t=>t.secondaryPalette,tone:t=>F(t)?25:30,background:t=>n.secondaryFixedDim,secondBackground:t=>n.secondaryFixed,contrastCurve:new d(3,4.5,7,11)});n.tertiaryFixed=u.fromPalette({name:"tertiary_fixed",palette:t=>t.tertiaryPalette,tone:t=>F(t)?40:90,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.tertiaryFixed,n.tertiaryFixedDim,10,"lighter",!0)});n.tertiaryFixedDim=u.fromPalette({name:"tertiary_fixed_dim",palette:t=>t.tertiaryPalette,tone:t=>F(t)?30:80,isBackground:!0,background:t=>n.highestSurface(t),contrastCurve:new d(1,1,3,4.5),toneDeltaPair:t=>new z(n.tertiaryFixed,n.tertiaryFixedDim,10,"lighter",!0)});n.onTertiaryFixed=u.fromPalette({name:"on_tertiary_fixed",palette:t=>t.tertiaryPalette,tone:t=>F(t)?100:10,background:t=>n.tertiaryFixedDim,secondBackground:t=>n.tertiaryFixed,contrastCurve:new d(4.5,7,11,21)});n.onTertiaryFixedVariant=u.fromPalette({name:"on_tertiary_fixed_variant",palette:t=>t.tertiaryPalette,tone:t=>F(t)?90:30,background:t=>n.tertiaryFixedDim,secondBackground:t=>n.tertiaryFixed,contrastCurve:new d(3,4.5,7,11)});/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.sourceColorArgb=e.sourceColorArgb,this.variant=e.variant,this.contrastLevel=e.contrastLevel,this.isDark=e.isDark,this.sourceColorHct=O.fromInt(e.sourceColorArgb),this.primaryPalette=e.primaryPalette,this.secondaryPalette=e.secondaryPalette,this.tertiaryPalette=e.tertiaryPalette,this.neutralPalette=e.neutralPalette,this.neutralVariantPalette=e.neutralVariantPalette,this.errorPalette=D.fromHueAndChroma(25,84)}static getRotatedHue(e,r,a){const o=e.hue;if(r.length!==a.length)throw new Error(`mismatch between hue length ${r.length} & rotations ${a.length}`);if(a.length===1)return Pt(e.hue+a[0]);const s=r.length;for(let i=0;i<=s-2;i++){const c=r[i],l=r[i+1];if(c<o&&o<l)return Pt(o+a[i])}return o}getArgb(e){return e.getArgb(this)}getHct(e){return e.getHct(this)}get primaryPaletteKeyColor(){return this.getArgb(n.primaryPaletteKeyColor)}get secondaryPaletteKeyColor(){return this.getArgb(n.secondaryPaletteKeyColor)}get tertiaryPaletteKeyColor(){return this.getArgb(n.tertiaryPaletteKeyColor)}get neutralPaletteKeyColor(){return this.getArgb(n.neutralPaletteKeyColor)}get neutralVariantPaletteKeyColor(){return this.getArgb(n.neutralVariantPaletteKeyColor)}get background(){return this.getArgb(n.background)}get onBackground(){return this.getArgb(n.onBackground)}get surface(){return this.getArgb(n.surface)}get surfaceDim(){return this.getArgb(n.surfaceDim)}get surfaceBright(){return this.getArgb(n.surfaceBright)}get surfaceContainerLowest(){return this.getArgb(n.surfaceContainerLowest)}get surfaceContainerLow(){return this.getArgb(n.surfaceContainerLow)}get surfaceContainer(){return this.getArgb(n.surfaceContainer)}get surfaceContainerHigh(){return this.getArgb(n.surfaceContainerHigh)}get surfaceContainerHighest(){return this.getArgb(n.surfaceContainerHighest)}get onSurface(){return this.getArgb(n.onSurface)}get surfaceVariant(){return this.getArgb(n.surfaceVariant)}get onSurfaceVariant(){return this.getArgb(n.onSurfaceVariant)}get inverseSurface(){return this.getArgb(n.inverseSurface)}get inverseOnSurface(){return this.getArgb(n.inverseOnSurface)}get outline(){return this.getArgb(n.outline)}get outlineVariant(){return this.getArgb(n.outlineVariant)}get shadow(){return this.getArgb(n.shadow)}get scrim(){return this.getArgb(n.scrim)}get surfaceTint(){return this.getArgb(n.surfaceTint)}get primary(){return this.getArgb(n.primary)}get onPrimary(){return this.getArgb(n.onPrimary)}get primaryContainer(){return this.getArgb(n.primaryContainer)}get onPrimaryContainer(){return this.getArgb(n.onPrimaryContainer)}get inversePrimary(){return this.getArgb(n.inversePrimary)}get secondary(){return this.getArgb(n.secondary)}get onSecondary(){return this.getArgb(n.onSecondary)}get secondaryContainer(){return this.getArgb(n.secondaryContainer)}get onSecondaryContainer(){return this.getArgb(n.onSecondaryContainer)}get tertiary(){return this.getArgb(n.tertiary)}get onTertiary(){return this.getArgb(n.onTertiary)}get tertiaryContainer(){return this.getArgb(n.tertiaryContainer)}get onTertiaryContainer(){return this.getArgb(n.onTertiaryContainer)}get error(){return this.getArgb(n.error)}get onError(){return this.getArgb(n.onError)}get errorContainer(){return this.getArgb(n.errorContainer)}get onErrorContainer(){return this.getArgb(n.onErrorContainer)}get primaryFixed(){return this.getArgb(n.primaryFixed)}get primaryFixedDim(){return this.getArgb(n.primaryFixedDim)}get onPrimaryFixed(){return this.getArgb(n.onPrimaryFixed)}get onPrimaryFixedVariant(){return this.getArgb(n.onPrimaryFixedVariant)}get secondaryFixed(){return this.getArgb(n.secondaryFixed)}get secondaryFixedDim(){return this.getArgb(n.secondaryFixedDim)}get onSecondaryFixed(){return this.getArgb(n.onSecondaryFixed)}get onSecondaryFixedVariant(){return this.getArgb(n.onSecondaryFixedVariant)}get tertiaryFixed(){return this.getArgb(n.tertiaryFixed)}get tertiaryFixedDim(){return this.getArgb(n.tertiaryFixedDim)}get onTertiaryFixed(){return this.getArgb(n.onTertiaryFixed)}get onTertiaryFixedVariant(){return this.getArgb(n.onTertiaryFixedVariant)}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{static of(e){return new N(e,!1)}static contentOf(e){return new N(e,!0)}static fromColors(e){return N.createPaletteFromColors(!1,e)}static contentFromColors(e){return N.createPaletteFromColors(!0,e)}static createPaletteFromColors(e,r){const a=new N(r.primary,e);if(r.secondary){const o=new N(r.secondary,e);a.a2=o.a1}if(r.tertiary){const o=new N(r.tertiary,e);a.a3=o.a1}if(r.error){const o=new N(r.error,e);a.error=o.a1}if(r.neutral){const o=new N(r.neutral,e);a.n1=o.n1}if(r.neutralVariant){const o=new N(r.neutralVariant,e);a.n2=o.n2}return a}constructor(e,r){const a=O.fromInt(e),o=a.hue,s=a.chroma;r?(this.a1=D.fromHueAndChroma(o,s),this.a2=D.fromHueAndChroma(o,s/3),this.a3=D.fromHueAndChroma(o+60,s/2),this.n1=D.fromHueAndChroma(o,Math.min(s/12,4)),this.n2=D.fromHueAndChroma(o,Math.min(s/6,8))):(this.a1=D.fromHueAndChroma(o,Math.max(48,s)),this.a2=D.fromHueAndChroma(o,16),this.a3=D.fromHueAndChroma(o+60,24),this.n1=D.fromHueAndChroma(o,4),this.n2=D.fromHueAndChroma(o,8)),this.error=D.fromHueAndChroma(25,84)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j extends et{constructor(e,r,a){super({sourceColorArgb:e.toInt(),variant:rt.EXPRESSIVE,contrastLevel:a,isDark:r,primaryPalette:D.fromHueAndChroma(Pt(e.hue+240),40),secondaryPalette:D.fromHueAndChroma(et.getRotatedHue(e,j.hues,j.secondaryRotations),24),tertiaryPalette:D.fromHueAndChroma(et.getRotatedHue(e,j.hues,j.tertiaryRotations),32),neutralPalette:D.fromHueAndChroma(e.hue+15,8),neutralVariantPalette:D.fromHueAndChroma(e.hue+15,12)})}}j.hues=[0,21,51,121,151,191,271,321,360];j.secondaryRotations=[45,95,45,20,45,90,45,45,45];j.tertiaryRotations=[120,120,20,45,20,15,20,120,120];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J extends et{constructor(e,r,a){super({sourceColorArgb:e.toInt(),variant:rt.VIBRANT,contrastLevel:a,isDark:r,primaryPalette:D.fromHueAndChroma(e.hue,200),secondaryPalette:D.fromHueAndChroma(et.getRotatedHue(e,J.hues,J.secondaryRotations),24),tertiaryPalette:D.fromHueAndChroma(et.getRotatedHue(e,J.hues,J.tertiaryRotations),32),neutralPalette:D.fromHueAndChroma(e.hue,10),neutralVariantPalette:D.fromHueAndChroma(e.hue,12)})}}J.hues=[0,41,61,101,131,181,251,301,360];J.secondaryRotations=[18,15,10,12,15,18,15,12,12];J.tertiaryRotations=[35,30,20,25,30,35,30,25,25];/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(t){const e=Ot(t),r=_t(t),a=zt(t),o=[e.toString(16),r.toString(16),a.toString(16)];for(const[s,i]of o.entries())i.length===1&&(o[s]="0"+i);return"#"+o.join("")}function oe(t){t=t.replace("#","");const e=t.length===3,r=t.length===6,a=t.length===8;if(!e&&!r&&!a)throw new Error("unexpected hex "+t);let o=0,s=0,i=0;return e?(o=$(t.slice(0,1).repeat(2)),s=$(t.slice(1,2).repeat(2)),i=$(t.slice(2,3).repeat(2))):r?(o=$(t.slice(0,2)),s=$(t.slice(2,4)),i=$(t.slice(4,6))):a&&(o=$(t.slice(2,4)),s=$(t.slice(4,6)),i=$(t.slice(6,8))),(255<<24|(o&255)<<16|(s&255)<<8|i&255)>>>0}function $(t){return parseInt(t,16)}var ut,lt,ht,nt,Z,Q,pt,Ft,Nt;let v=class extends Gt{constructor(){super(...arguments),ut.add(this),lt.set(this,new CSSStyleSheet),ht.set(this,!1),nt.set(this,void 0),Z.set(this,void 0),Q.set(this,void 0),pt.set(this,()=>E(this,ut,"m",Ft).call(this,!0)),this.color="#6750A4",this.scheme="auto",this.contrast="standard",this.strongFocus=!1,this.density=0,this.motion="standard"}get isDark(){switch(this.scheme){case"light":return!1;case"dark":return!0;default:if(this.parentElement instanceof HTMLBodyElement)switch(document.documentElement.style.colorScheme){case"light":return!1;case"dark":return!0}return E(this,Z,"f")?.matches??!1}}connectedCallback(){super.connectedCallback(),this.shadowRoot&&!this.shadowRoot.adoptedStyleSheets.includes(E(this,lt,"f"))&&(this.shadowRoot.adoptedStyleSheets=[...this.shadowRoot.adoptedStyleSheets,E(this,lt,"f")]),X(this,nt,matchMedia("(prefers-color-scheme: light)"),"f"),X(this,Z,matchMedia("(prefers-color-scheme: dark)"),"f"),X(this,Q,matchMedia("(forced-colors: active)"),"f"),[E(this,nt,"f"),E(this,Z,"f"),E(this,Q,"f")].forEach(e=>e.addEventListener("change",E(this,pt,"f")))}disconnectedCallback(){super.disconnectedCallback(),[E(this,nt,"f"),E(this,Z,"f"),E(this,Q,"f")].forEach(e=>e?.removeEventListener("change",E(this,pt,"f"))),X(this,nt,X(this,Z,X(this,Q,void 0,"f"),"f"),"f")}updated(e){super.updated(e),E(this,ut,"m",Ft).call(this,E(this,ht,"f")&&["color","scheme","contrast"].some(r=>e.has(r)))}firstUpdated(e){super.firstUpdated(e),X(this,ht,!0,"f")}render(){return Kt`<slot></slot>`}};lt=new WeakMap;ht=new WeakMap;nt=new WeakMap;Z=new WeakMap;Q=new WeakMap;pt=new WeakMap;ut=new WeakSet;Ft=function(e){const r=oe(this.color),a=N.of(r),o=new et({sourceColorArgb:r,variant:1,contrastLevel:E(this,ut,"m",Nt).call(this),isDark:this.isDark,primaryPalette:a.a1,secondaryPalette:a.a2,tertiaryPalette:a.a3,neutralPalette:a.n1,neutralVariantPalette:a.n2});let s="";for(const i in n)if(!i.endsWith("PaletteKeyColor")){const c=n[i];c instanceof u&&(s+=`--md-sys-color-${i.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}: ${St(c.getArgb(o))};`)}if(this.motion==="expressive"&&(s+="--md-sys-motion-spring-fast-spatial: 350ms cubic-bezier(0.42, 1.67, 0.21, 0.90);",s+="--md-sys-motion-spring-default-spatial: 500ms cubic-bezier(0.38, 1.21, 0.22, 1.00);",s+="--md-sys-motion-spring-slow-spatial: 650ms cubic-bezier(0.39, 1.29, 0.35, 0.98);",s+="--md-sys-motion-spring-fast-effects: 150ms cubic-bezier(0.31, 0.94, 0.34, 1.00);",s+="--md-sys-motion-spring-default-effects: 200ms cubic-bezier(0.34, 0.80, 0.34, 1.00);",s+="--md-sys-motion-spring-slow-effects: 300ms cubic-bezier(0.34, 0.88, 0.34, 1.00);"),s+=`--md-sys-density-scale: ${this.density};`,s+=`--m3e-scrollbar-thumb-color: ${St(o.neutralPalette.tone(60))};`,s+=`--m3e-focus-ring-visibility: ${this.strongFocus?"visible":"hidden"};`,E(this,lt,"f").replaceSync(`:host { ${s} }`),this.parentElement instanceof HTMLBodyElement){const i=getComputedStyle(this);switch(this.scheme){case"light":document.documentElement.style.colorScheme="light";break;case"dark":document.documentElement.style.colorScheme="dark";break;default:switch(document.documentElement.style.colorScheme){case"light":case"dark":document.documentElement.style.colorScheme="light dark";break}}E(this,Q,"f")?.matches?this.parentElement.style.backgroundColor=this.parentElement.style.color=this.parentElement.ownerDocument.documentElement.style.scrollbarColor=this.parentElement.style.scrollbarColor="":(this.parentElement.style.backgroundColor=i.getPropertyValue("--md-sys-color-background"),this.parentElement.style.color=i.getPropertyValue("--md-sys-color-on-background"),this.parentElement.ownerDocument.documentElement.style.scrollbarColor=this.parentElement.style.scrollbarColor=`${i.getPropertyValue("--m3e-scrollbar-thumb-color")} ${i.getPropertyValue("--m3e-scrollbar-track-color")}`)}E(this,ht,"f")&&this.dispatchEvent(new Event("change",{bubbles:!0})),e&&document.body.offsetHeight};Nt=function(){switch(this.contrast){case"high":return 1;case"medium":return .5;default:return 0}};v.styles=$t`:host { display: contents; font-size: ${yt.typescale.standard.body.large.fontSize}; font-weight: ${yt.typescale.standard.body.large.fontWeight}; line-height: ${yt.typescale.standard.body.large.lineHeight}; letter-spacing: ${yt.typescale.standard.body.large.tracking}; }`;at([st()],v.prototype,"color",void 0);at([st()],v.prototype,"scheme",void 0);at([st()],v.prototype,"contrast",void 0);at([st({attribute:"strong-focus",type:Boolean})],v.prototype,"strongFocus",void 0);at([st({type:Number})],v.prototype,"density",void 0);at([st()],v.prototype,"motion",void 0);v=at([vt("m3e-theme")],v);
