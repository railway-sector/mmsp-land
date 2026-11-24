import{bt as v,bD as D,jT as nt,eY as lt,eD as ct,kK as dt,dk as R,kA as ut,tK as ht,mg as mt,Co as ye,ee as Te,X as n,Y as G,a1 as ee,Cp as pt,Cq as vt,kI as ne,ky as ft,qs as le,kR as V,ej as we,ei as ce,dc as gt,_ as _e,bd as xt,df as q,Cr as yt,dj as de,Cs as Tt,Ct as wt,Cu as _t,dh as bt,br as Mt,e6 as Ct,di as ue,bo as $t,hx as Ot,bs as St}from"./index-Dmtgfku4.js";import{e as i,g as Y,d as p,v as M,h as w,w as be,x as J,b as A,t as Vt,u as te,i as u,y as he}from"./getEmissions.glsl-C48L9Ou5.js";import{d as Ft,n as Nt,f as It,h as Me,j as Ce,g as $e,v as Oe,r as Se,k as Ve,t as Fe,a as Ne,_ as Ie,b as ze,l as zt,i as Rt,c as At}from"./SSAO.glsl-iF6K7u8k.js";import{j as Re,ax as _,r as Ae,ay as me,ak as Dt,az as ae,aA as De,aB as Pe,aC as Pt,aD as B,ai as kt,aE as Bt,z as ke,l as Ut,s as C,ah as $,u as z,A as O,aF as Lt,aj as Et,m as Ht,q as Wt,aG as Be,e as U,x as Ue,B as jt,C as Le,al as Gt,H as qt,J as Kt,D as Qt,E as Yt,F as Jt,I as Xt,am as Zt,a as ea,ad as ta,ap as aa,ae as ra,af as oa,a3 as ia}from"./OutputColorHighlightOLID.glsl-B05J6Odi.js";import{e as Ee,u as sa}from"./AlphaCutoff-pStc-i3u.js";import{t as na}from"./DefaultBufferWriter-CU0pCJP7.js";import{n as X,a as y,K as re}from"./InterleavedLayout-CLBXAKI_.js";import{_ as He,k as L,E as pe}from"./BufferView-_b4_pKGU.js";import{t as la}from"./VertexBuffer-DO3DtlP_.js";import{h as ca}from"./mathUtils-DCLo63g3.js";import{i as da}from"./pbrUtils-D0118g5M.js";import{T as ua,f as ha,g as ma}from"./RenderingContext-DH--_QN5.js";import{n as pa,r as va,i as We}from"./doublePrecisionUtils-CW5W7VLJ.js";import{t as je}from"./NoParameters-oniR9cXl.js";function W(t,e){switch(t.fragment.code.add(i`vec3 screenDerivativeNormal(vec3 positionView) {
return normalize(cross(dFdx(positionView), dFdy(positionView)));
}`),e.normalType){case 1:t.attributes.add("normalCompressed","vec2"),t.vertex.code.add(i`vec3 decompressNormal(vec2 normal) {
float z = 1.0 - abs(normal.x) - abs(normal.y);
return vec3(normal + sign(normal) * min(z, 0.0), z);
}
vec3 normalModel() {
return decompressNormal(normalCompressed);
}`);break;case 0:t.attributes.add("normal","vec3"),t.vertex.code.add(i`vec3 normalModel() {
return normal;
}`);break;default:e.normalType;case 2:case 3:}}function fa(t){t.uniforms.add(new Re("dpDummy",()=>1)).code.add(i`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 hiD = hiA + hiB;
vec3 loD = loA + loB;
return  dpDummy * hiD + loD;
}`)}let ga=class extends je{constructor(){super(...arguments),this.transformWorldFromViewTH=v(),this.transformWorldFromViewTL=v(),this.transformViewFromCameraRelativeRS=D()}},xa=class extends je{constructor(){super(...arguments),this.transformWorldFromModelRS=D(),this.transformWorldFromModelTH=v(),this.transformWorldFromModelTL=v(),this.transformationDrawId=0}};function Ge(t,e){let{vertex:a,varyings:r}=t;switch(e.normalType){case 0:case 1:t.include(W,e),r.add("vNormalWorld","vec3"),r.add("vNormalView","vec3"),a.uniforms.add(new _("transformNormalViewFromGlobal",o=>o.transformNormalViewFromGlobal)),a.code.add(i`void forwardNormal() {
vNormalWorld = normalModel();
vNormalView = transformNormalViewFromGlobal * vNormalWorld;
}`);break;case 2:t.vertex.code.add(i`void forwardNormal() {}`);break;default:e.normalType;case 3:}}class ya extends ga{constructor(){super(...arguments),this.transformNormalViewFromGlobal=D()}}let Ta=class extends xa{constructor(){super(...arguments),this.toMapSpace=nt()}};class wa{constructor(e,a,r){this.elementSize=a.stride,this._buffer=new la(e,X(a,1)),this.resize(r)}destroy(){this._buffer.dispose()}get capacity(){return this._capacity}get array(){return this._array}get buffer(){return this._buffer}get usedMemory(){return this._array.byteLength+this._buffer.usedMemory}copyRange(e,a,r,o=0){let s=new Uint8Array(this.array,e*this.elementSize,(a-e)*this.elementSize);new Uint8Array(r.array,o*this.elementSize).set(s)}transferAll(){this._buffer.setData(this._array)}transferRange(e,a){let r=e*this.elementSize,o=a*this.elementSize;this._buffer.setSubData(new Uint8Array(this._array),r,r,o)}resize(e){let a=e*this.elementSize,r=new ArrayBuffer(a);this._array&&(e>=this._capacity?new Uint8Array(r).set(new Uint8Array(this._array)):new Uint8Array(r).set(new Uint8Array(this._array).subarray(0,e*this.elementSize))),this._array=r,this._buffer.setSize(a),this._capacity=e}}class ve{constructor(e){this.localTransform=e.localTransform,this.globalTransform=e.globalTransform,this.modelOrigin=e.modelOrigin,this.model=e.instanceModel,this.modelNormal=e.instanceModelNormal,this.modelScaleFactors=e.modelScaleFactors,this.boundingSphere=e.boundingSphere,this.featureAttribute=e.getField("instanceFeatureAttribute",He),this.color=e.getField("instanceColor",L),this.olidColor=e.getField("instanceOlidColor",L),this.state=e.getField("state",pe),this.lodLevel=e.getField("lodLevel",pe)}}let I=class extends lt{constructor(t,e){super(t),this.events=new ct,this._capacity=0,this._size=0,this._next=0,this._highlightOptionsMap=new Map,this._highlightOptionsMapPrev=new Map,this._layout=Ma(e),this._capacity=E,this._buffer=this._layout.createBuffer(this._capacity),this._view=new ve(this._buffer)}get capacity(){return this._capacity}get size(){return this._size}get view(){return this._view}addInstance(){this._size+1>this._capacity&&this._grow();let t=this._findSlot();return this._view.state.set(t,1),this._size++,this.events.emit("instances-changed"),t}removeInstance(t){let e=this._view.state;y(t>=0&&t<this._capacity&&!!(e.get(t)&1),"invalid instance handle"),this._getStateFlag(t,18)?this._setStateFlags(t,32):this.freeInstance(t),this.events.emit("instances-changed")}freeInstance(t){let e=this._view.state;y(t>=0&&t<this._capacity&&!!(e.get(t)&1),"invalid instance handle"),e.set(t,0),this._size--}setLocalTransform(t,e,a=!0){this._view.localTransform.setMat(t,e),a&&this.updateModelTransform(t)}getLocalTransform(t,e){this._view.localTransform.getMat(t,e)}setGlobalTransform(t,e,a=!0){this._view.globalTransform.setMat(t,e),a&&this.updateModelTransform(t)}getGlobalTransform(t,e){this._view.globalTransform.getMat(t,e)}updateModelTransform(t){let e=this._view,a=f,r=x;e.localTransform.getMat(t,fe),e.globalTransform.getMat(t,K);let o=dt(K,K,fe);R(a,o[12],o[13],o[14]),e.modelOrigin.setVec(t,a),ut(r,o),e.model.setMat(t,r);let s=ca(f,o);s.sort(),e.modelScaleFactors.set(t,0,s[1]),e.modelScaleFactors.set(t,1,s[2]),ht(r,r),mt(r,r),e.modelNormal.setMat(t,r),this._setStateFlags(t,64),this.events.emit("instance-transform-changed",{index:t})}getModelTransform(t,e){let a=this._view;a.model.getMat(t,x),a.modelOrigin.getVec(t,f),e[0]=x[0],e[1]=x[1],e[2]=x[2],e[3]=0,e[4]=x[3],e[5]=x[4],e[6]=x[5],e[7]=0,e[8]=x[6],e[9]=x[7],e[10]=x[8],e[11]=0,e[12]=f[0],e[13]=f[1],e[14]=f[2],e[15]=1}applyShaderTransformation(t,e){this.shaderTransformation!=null&&this.shaderTransformation.applyTransform(this,t,e)}getCombinedModelTransform(t,e){return this.getModelTransform(t,e),this.shaderTransformation!=null&&this.shaderTransformation.applyTransform(this,t,e),e}getCombinedLocalTransform(t,e){this._view.localTransform.getMat(t,e),this.shaderTransformation!=null&&this.shaderTransformation.applyTransform(this,t,e)}getCombinedMaxScaleFactor(t){let e=this._view.modelScaleFactors.get(t,1);return this.shaderTransformation!=null&&(this.shaderTransformation.scaleFactor(f,this,t),e*=Math.max(f[0],f[1],f[2])),e}getCombinedMedianScaleFactor(t){let e=this._view.modelScaleFactors.get(t,0);return this.shaderTransformation!=null&&(this.shaderTransformation.scaleFactor(f,this,t),e*=_a(f[0],f[1],f[2])),e}getModel(t,e){this._view.model.getMat(t,e)}setFeatureAttribute(t,e){this._view.featureAttribute?.setVec(t,e)}getFeatureAttribute(t,e){this._view.featureAttribute?.getVec(t,e)}setColor(t,e){this._view.color?.setVec(t,e)}setObjectAndLayerIdColor(t,e){this._view.olidColor?.setVec(t,e)}setVisible(t,e){e!==this.getVisible(t)&&(this._setStateFlag(t,4,e),this.events.emit("instance-visibility-changed",{index:t}))}getVisible(t){return this._getStateFlag(t,4)}setHighlight(t,e){let{_highlightOptionsMap:a}=this,r=a.get(t);e?e!==r&&(a.set(t,e),this._setStateFlag(t,8,!0),this.events.emit("instance-highlight-changed")):r&&(a.delete(t),this._setStateFlag(t,8,!1),this.events.emit("instance-highlight-changed"))}get highlightOptionsMap(){return this._highlightOptionsMap}getHighlightStateFlag(t){return this._getStateFlag(t,8)}geHighlightOptionsPrev(t){let e=this._highlightOptionsMapPrev.get(t)??null;return this._highlightOptionsMapPrev.delete(t),e}getHighlightName(t){let e=this.highlightOptionsMap.get(t)??null;return e?this._highlightOptionsMapPrev.set(t,e):this._highlightOptionsMapPrev.delete(t),e}getState(t){return this._view.state.get(t)}getLodLevel(t){return this._view.lodLevel.get(t)}countFlags(t){let e=0;for(let a=0;a<this._capacity;++a)this.getState(a)&t&&++e;return e}_setStateFlags(t,e){let a=this._view.state;e=a.get(t)|e,a.set(t,e)}_clearStateFlags(t,e){let a=this._view.state;e=a.get(t)&~e,a.set(t,e)}_setStateFlag(t,e,a){a?this._setStateFlags(t,e):this._clearStateFlags(t,e)}_getStateFlag(t,e){return!!(this._view.state.get(t)&e)}_grow(){this._capacity=Math.max(E,Math.floor(this._capacity*ye)),this._buffer=this._layout.createBuffer(this._capacity).copyFrom(this._buffer),this._view=new ve(this._buffer)}_findSlot(){let t=this._view.state,e=this._next;for(;t.get(e)&1;)e=e+1===this._capacity?0:e+1;return this._next=e+1===this._capacity?0:e+1,e}};n([G({constructOnly:!0})],I.prototype,"shaderTransformation",void 0),n([G()],I.prototype,"_size",void 0),n([G({readOnly:!0})],I.prototype,"size",null),I=n([ee("esri.views.3d.webgl-engine.lib.lodRendering.InstanceData")],I);function _a(t,e,a){return Math.max(Math.min(t,e),Math.min(Math.max(t,e),a))}const ba=re().mat4f64("localTransform").mat4f64("globalTransform").vec4f64("boundingSphere").vec3f64("modelOrigin").mat3f("instanceModel").mat3f("instanceModelNormal").vec2f("modelScaleFactors");function Ma(t){return qe(ba.clone(),t).u8("state").u8("lodLevel")}function qe(t,e){return e.instancedFeatureAttribute&&t.vec4f("instanceFeatureAttribute"),e.instancedColor&&t.vec4u8("instanceColor"),Ae()&&t.vec4u8("instanceOlidColor"),t}const f=v(),x=D(),fe=Te(),K=Te(),E=64;class Ca{constructor(e){this.model=e.instanceModel,this.modelNormal=e.instanceModelNormal,this.modelOriginHi=e.instanceModelOriginHi,this.modelOriginLo=e.instanceModelOriginLo,this.featureAttribute=e.getField("instanceFeatureAttribute",He),this.color=e.getField("instanceColor",L),this.olidColor=e.getField("instanceOlidColor",L)}}let vr=class{constructor(e,a){this._rctx=e,this._layout=a,this._headIndex=0,this._tailIndex=0,this._firstIndex=null,this._captureFirstIndex=!0,this._updating=!1,this._prevHeadIndex=0,this._resized=!1,this._capacity=1}destroy(){this._buffer&&this._buffer.destroy()}get buffer(){return this._buffer.buffer}get view(){return this._view}get capacity(){return this._capacity}get size(){let e=this._headIndex,a=this._tailIndex;return e>=a?e-a:e+this._capacity-a}get isEmpty(){return this._headIndex===this._tailIndex}get isFull(){return this._tailIndex===(this._headIndex+1)%this._capacity}get headIndex(){return this._headIndex}get tailIndex(){return this._tailIndex}get firstIndex(){return this._firstIndex}get usedMemory(){return this._buffer?.usedMemory??0}reset(){this._headIndex=0,this._tailIndex=0,this._firstIndex=null}startUpdateCycle(){this._captureFirstIndex=!0}beginUpdate(){y(!this._updating,"already updating"),this._updating=!0,this._prevHeadIndex=this._headIndex}endUpdate(){y(this._updating,"not updating"),this.size<pt*this.capacity&&this._shrink(),this._resized?(this._buffer.transferAll(),this._resized=!1):this._transferRange(this._prevHeadIndex,this._headIndex),this._updating=!1}allocateHead(){y(this._updating,"not updating"),this.isFull&&this._grow();let e=this.headIndex;return this._captureFirstIndex&&=(this._firstIndex=e,!1),this._incrementHead(),y(this._headIndex!==this._tailIndex,"invalid pointers"),e}freeTail(){y(this._updating,"not updating"),y(this.size>0,"invalid size");let e=this._tailIndex===this._firstIndex;this._incrementTail(),e&&(this._firstIndex=this._tailIndex)}_grow(){let e=Math.max(E,Math.floor(this._capacity*ye));this._resize(e)}_shrink(){let e=Math.max(E,Math.floor(this._capacity*vt));this._resize(e)}_resize(e){if(y(this._updating,"not updating"),e===this._capacity)return;let a=new wa(this._rctx,this._layout,e);if(this._buffer){this._firstIndex&&=(this._firstIndex+this._capacity-this._tailIndex)%this._capacity;let r=this.size,o=this._compactInstances(a);y(o===r,"invalid compaction"),this._buffer.destroy(),this._tailIndex=0,this._headIndex=o,this._prevHeadIndex=0}this._resized=!0,this._capacity=e,this._buffer=a,this._view=new Ca(this._layout.createView(this._buffer.array))}_compactInstances(e){let a=this._headIndex,r=this._tailIndex;return r<a?(this._buffer.copyRange(r,a,e),a-r):r>a?(this._buffer.copyRange(r,this._capacity,e),a>0&&this._buffer.copyRange(0,a,e,this._capacity-r),a+(this._capacity-r)):0}_incrementHead(e=1){this._headIndex=(this._headIndex+e)%this._capacity}_incrementTail(e=1){this._tailIndex=(this._tailIndex+e)%this._capacity}_transferRange(e,a){e<a?this._buffer.transferRange(e,a):e>a&&(a>0&&this._buffer.transferRange(0,a),this._buffer.transferRange(e,this._capacity))}};const $a=re().vec3f("instanceModelOriginHi").vec3f("instanceModelOriginLo").mat3f("instanceModel").mat3f("instanceModelNormal");function Oa(t){return qe($a.clone(),t)}function Ke(t){t.vertex.code.add(i`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}const ge=D();function Qe(t,e){let{hasModelTransformation:a,instancedDoublePrecision:r,instanced:o,output:s,hasVertexTangents:h}=e;a&&t.vertex.uniforms.add(new Ft("model",m=>m.modelTransformation??ne),new _("normalLocalOriginFromModel",m=>(ft(ge,m.modelTransformation??ne),ge))),o&&r&&(t.attributes.add("instanceModelOriginHi","vec3"),t.attributes.add("instanceModelOriginLo","vec3"),t.attributes.add("instanceModel","mat3"),t.attributes.add("instanceModelNormal","mat3"));let d=t.vertex;r&&(d.include(fa),d.uniforms.add(new me("viewOriginHi",m=>pa(R(P,m.camera.viewInverseTransposeMatrix[3],m.camera.viewInverseTransposeMatrix[7],m.camera.viewInverseTransposeMatrix[11]),P)),new me("viewOriginLo",m=>va(R(P,m.camera.viewInverseTransposeMatrix[3],m.camera.viewInverseTransposeMatrix[7],m.camera.viewInverseTransposeMatrix[11]),P)))),d.code.add(i`
    vec3 getVertexInLocalOriginSpace() {
      return ${a?r?"(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz":"(model * localPosition()).xyz":r?"instanceModel * localPosition().xyz":"localPosition().xyz"};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${r?i`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:"return vpos;"}
    }

    vec3 dpNormal(vec4 _normal) {
      return normalize(${a?r?"normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)":"normalLocalOriginFromModel * _normal.xyz":r?"instanceModelNormal * _normal.xyz":"_normal.xyz"});
    }
  `),s===4&&d.uniforms.add(Dt).code.add(i`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${a?r?"vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)":"vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)":r?"vec4(instanceModelNormal * _normal.xyz, 1.0)":"_normal"}).xyz);
    }
    `),h&&d.code.add(i`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${a?r?"return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);":"return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);":r?"return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);":"return _tangent;"}
    }`)}const P=v();function Sa(t,e){e.instancedColor?(t.attributes.add("instanceColor","vec4"),t.vertex.include(ae),t.vertex.include(De),t.vertex.include(Pe),t.vertex.code.add(i`
      MaskedColor applyInstanceColor(MaskedColor color) {
        return multiplyMaskedColors( color, createMaskedFromUInt8NaNColor(${"instanceColor"}));
      }
    `)):t.vertex.code.add(i`MaskedColor applyInstanceColor(MaskedColor color) {
return color;
}`)}function Va(t,e){t.varyings.add("colorMixMode","float"),t.varyings.add("opacityMixMode","float"),t.vertex.uniforms.add(new Pt("symbolColorMixMode",a=>B[a.colorMixMode])),e.hasSymbolColors?(t.vertex.include(ae),t.vertex.include(De),t.vertex.include(Pe),t.attributes.add("symbolColor","vec4"),t.vertex.code.add(i`
    MaskedColor applySymbolColor(MaskedColor color) {
      return multiplyMaskedColors(color, createMaskedFromUInt8NaNColor(${"symbolColor"}));
    }
  `)):t.vertex.code.add(i`MaskedColor applySymbolColor(MaskedColor color) {
return color;
}`),t.vertex.code.add(i`
    void forwardColorMixMode(bvec4 mask) {
      colorMixMode = float(mask.r ? ${i.int(B.ignore)} : symbolColorMixMode) + 0.5;
      opacityMixMode = float(mask.a ? ${i.int(B.ignore)} : symbolColorMixMode) + 0.5;
    }
  `)}function oe(t,e){let{vertex:a,fragment:r,varyings:o}=t;t.include(Sa,e),t.include(Va,e),t.include(kt,e),a.include(ae),a.include(Bt),a.include(ke),a.uniforms.add(new Ut("externalColor",s=>s.externalColor,{supportsNaN:!0})),o.add("vExternalColor","vec4"),a.code.add(i`
    void forwardDefaultMaterialExternalColor() {
      forwardVertexColor();

      MaskedColor maskedColor =
        applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

      vExternalColor = maskedColor.color;
      forwardColorMixMode(maskedColor.mask);
    }

    bool shouldCullByOpacity() {
      return int(opacityMixMode) != ${i.int(B.ignore)} && vExternalColor.a < alphaCutoff;
    }
  `),r.include(Nt),r.uniforms.add(new Y("opacity",s=>s.opacity),new Y("layerOpacity",s=>s.layerOpacity)),r.code.add(i`
    float getDefaultMaterialOpacity(float textureOpacity) {
      return layerOpacity * mixExternalOpacity(
        ${p(e.hasVertexColors,"vColor.a * ")} opacity,
        textureOpacity,
        vExternalColor.a,
        int(opacityMixMode)
      );
    }
  `)}function Fa(t,e){switch(e.output){case 5:case 6:case 7:case 8:t.fragment.code.add(i`void outputDepth(float _linearDepth){
const float slope_scale = 2.0;
const float bias = 20.0 * .000015259;
float m = max(abs(dFdx(_linearDepth)), abs(dFdy(_linearDepth)));
gl_FragDepth = _linearDepth + slope_scale * m + bias;
}`)}}function S(t,e){Na(t,e,new Y("textureAlphaCutoff",a=>a.textureAlphaCutoff))}function Na(t,e,a){let r=t.fragment;switch(r.code.add("void discardOrAdjustAlpha(inout vec4 color) {"),e.alphaDiscardMode){case 1:r.code.add("color.a = 1.0;");break;case 0:e.output!==0&&(r.include(ke),r.code.add("if (color.a < alphaCutoff) discard;"));break;case 3:e.output!==0&&r.uniforms.add(a).code.add("if (color.a < textureAlphaCutoff) discard;");break;case 2:r.uniforms.add(a).code.add(`
        if (color.a < textureAlphaCutoff) discard;
        color.a = 1.0;
      `);break;case 4:break;default:e.alphaDiscardMode}r.code.add("}")}function Ye(t,e){let{vertex:a,fragment:r,varyings:o}=t,{hasColorTexture:s,alphaDiscardMode:h}=e,d=s&&h!==1,{output:m,normalType:l,hasColorTextureTransform:T}=e;switch(m){case 3:C(a,e),t.include($),r.include(O,e),t.include(M,e),d&&r.uniforms.add(new w("tex",g=>g.texture)),a.main.add(i`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),t.include(S,e),r.main.add(i`
        discardBySlice(vpos);
        ${p(d,i`vec4 texColor = texture(tex, ${T?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}`);break;case 5:case 6:case 7:case 8:case 11:C(a,e),t.include($),t.include(M,e),t.include(z,e),t.include(Fa,e),r.include(O,e),t.include(Et,e),o.add("depth","float",{invariant:!0}),d&&r.uniforms.add(new w("tex",g=>g.texture)),a.uniforms.add(Ht).main.add(i`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),t.include(S,e),r.main.add(i`
        discardBySlice(vpos);
        ${p(d,i`vec4 texColor = texture(tex, ${T?"colorUV":"vuv0"});
               discardOrAdjustAlpha(texColor);`)}
        ${m===11?i`outputObjectAndLayerIdColor();`:i`outputDepth(depth);`}`);break;case 4:{C(a,e),t.include($),t.include(W,e),t.include(Ge,e),t.include(M,e),t.include(z,e),t.include(oe,e),d&&r.uniforms.add(new w("tex",F=>F.texture)),l===2&&o.add("vPositionView","vec3",{invariant:!0});let g=l===0||l===1;a.main.add(i`
        forwardDefaultMaterialExternalColor();

        if (shouldCullByOpacity()) {
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = getVertexInLocalOriginSpace();
        ${g?i`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:i`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),r.include(O,e),t.include(S,e),r.main.add(i`
        discardBySlice(vpos);
        ${p(d,i`vec4 texColor = texture(tex, ${T?"colorUV":"vuv0"});
               discardOrAdjustAlpha(texColor);`,i`vec4 texColor = vec4(1.0);`)}
        float opacity = getDefaultMaterialOpacity(texColor.a);

        ${l===2?i`vec3 normal = screenDerivativeNormal(vPositionView);`:i`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, opacity);`);break}case 10:C(a,e),t.include($),t.include(M,e),t.include(z,e),d&&r.uniforms.add(new w("tex",g=>g.texture)),a.main.add(i`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),r.include(O,e),t.include(S,e),t.include(Lt,e),r.main.add(i`
        discardBySlice(vpos);
        ${p(d,i`vec4 texColor = texture(tex, ${T?"colorUV":"vuv0"});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}function Ia(t,e){return za(t,e)}function za(t,e){let a=t.fragment,{hasVertexTangents:r,doubleSidedMode:o,hasNormalTexture:s,textureCoordinateType:h,bindType:d,hasNormalTextureTransform:m}=e;r?(t.attributes.add("tangent","vec4"),t.varyings.add("vTangent","vec4"),o===2?a.code.add(i`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):a.code.add(i`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):a.code.add(i`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),s&&h!==0&&(t.include(be,e),a.uniforms.add(d===1?new w("normalTexture",l=>l.textureNormal):new J("normalTexture",l=>l.textureNormal)),m&&(a.uniforms.add(d===1?new Wt("scale",l=>l.scale??le):new It("scale",l=>l.scale??le)),a.uniforms.add(new _("normalTextureTransformMatrix",l=>l.normalTextureTransformMatrix??V))),a.code.add(i`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),m&&a.code.add(i`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),a.code.add(i`return tangentSpace * rawNormal;
}`))}function Ra(t,e){let a=t.fragment;switch(e.doubleSidedMode){case 0:a.code.add("vec3 shadingNormal(vec3 normalView, vec3 viewDirection) { return normalize(normalView); }");break;case 1:a.code.add(i`vec3 shadingNormal(vec3 normalView, vec3 viewDirection) {
return dot(normalView, viewDirection) > 0.0 ? normalize(-normalView) : normalize(normalView);
}`);break;case 2:a.code.add(i`vec3 shadingNormal(vec3 normalView, vec3 viewDirection) {
return gl_FrontFacing ? normalize(normalView) : normalize(-normalView);
}`);break;default:e.doubleSidedMode;case 3:}}function Je(t,e){let a=e.pbrMode,r=t.fragment;switch(a){case 5:case 3:case 4:case 6:r.code.add(i`void applyPBRFactors() {}`);return;case 0:case 7:r.code.add(i`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);return;case 2:r.code.add(i`float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);return;case 1:{let{hasMetallicRoughnessTexture:o,hasMetallicRoughnessTextureTransform:s,hasOcclusionTexture:h,hasOcclusionTextureTransform:d,bindType:m}=e;(o||h)&&t.include(be,e),r.code.add("float occlusion;"),o&&r.uniforms.add(m===1?new w("texMetallicRoughness",l=>l.textureMetallicRoughness):new J("texMetallicRoughness",l=>l.textureMetallicRoughness)),h&&r.uniforms.add(m===1?new w("texOcclusion",l=>l.textureOcclusion):new J("texOcclusion",l=>l.textureOcclusion)),r.uniforms.add(m===1?new A("mrrFactors",l=>l.mrrFactors):new Vt("mrrFactors",l=>l.mrrFactors)),r.include(Me),o&&r.code.add(i`void applyMetallicRoughness(vec2 uv) {
vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
mrr[0] *= metallicRoughness.b;
mrr[1] *= metallicRoughness.g;
}`),h&&r.code.add("void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }"),r.code.add(i`
          float getBakedOcclusion() {
            return ${h?"occlusion":"1.0"};
          }

          void applyPBRFactors() {
            mrr = mrrFactors;
            occlusion = 1.0;

            ${p(o,`applyMetallicRoughness(${s?"metallicRoughnessUV":"vuv0"});`)}
            ${p(h,`applyOcclusion(${d?"occlusionUV":"vuv0"});`)}
          }`)}}}function Xe(t,e){e.hasColorTextureTransform?(t.varyings.add("colorUV","vec2"),t.vertex.uniforms.add(new _("colorTextureTransformMatrix",a=>a.colorTextureTransformMatrix??V)).code.add(i`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(i`void forwardColorUV(){}`)}function Aa(t,e){e.hasNormalTextureTransform&&e.textureCoordinateType!==0?(t.varyings.add("normalUV","vec2"),t.vertex.uniforms.add(new _("normalTextureTransformMatrix",a=>a.normalTextureTransformMatrix??V)).code.add(i`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(i`void forwardNormalUV(){}`)}function Ze(t,e){e.hasEmissionTextureTransform&&e.textureCoordinateType!==0?(t.varyings.add("emissiveUV","vec2"),t.vertex.uniforms.add(new _("emissiveTextureTransformMatrix",a=>a.emissiveTextureTransformMatrix??V)).code.add(i`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(i`void forwardEmissiveUV(){}`)}function Da(t,e){e.hasOcclusionTextureTransform&&e.textureCoordinateType!==0?(t.varyings.add("occlusionUV","vec2"),t.vertex.uniforms.add(new _("occlusionTextureTransformMatrix",a=>a.occlusionTextureTransformMatrix??V)).code.add(i`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(i`void forwardOcclusionUV(){}`)}function Pa(t,e){e.hasMetallicRoughnessTextureTransform&&e.textureCoordinateType!==0?(t.varyings.add("metallicRoughnessUV","vec2"),t.vertex.uniforms.add(new _("metallicRoughnessTextureTransformMatrix",a=>a.metallicRoughnessTextureTransformMatrix??V)).code.add(i`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):t.vertex.code.add(i`void forwardMetallicRoughnessUV(){}`)}function et(t,e){e.snowCover&&(t.uniforms.add(new Re("snowCover",a=>a.snowCover)).code.add(i`float getSnow(vec3 normal, vec3 groundNormal) {
return smoothstep(0.5, 0.55, dot(normal, groundNormal)) * snowCover;
}
float getRealisticTreeSnow(vec3 faceNormal, vec3 shadingNormal, vec3 groundNormal) {
float snow = min(1.0, smoothstep(0.5, 0.55, dot(faceNormal, groundNormal)) +
smoothstep(0.5, 0.55, dot(-faceNormal, groundNormal)) +
smoothstep(0.0, 0.1, dot(shadingNormal, groundNormal)));
return snow * snowCover;
}`),t.include(Me),t.code.add(i`void applySnowToMRR(float snow) {
mrr = mix(mrr, vec3(0.0, 1.0, 0.04), snow);
}`))}function tt(t){let e=new We,{attributes:a,vertex:r,fragment:o,varyings:s}=e,{output:h,normalType:d,offsetBackfaces:m,snowCover:l,pbrMode:T,textureAlphaPremultiplied:g,instancedDoublePrecision:F,hasVertexColors:b,hasVertexTangents:ie,hasColorTexture:se,hasNormalTexture:ot,hasNormalTextureTransform:it,hasColorTextureTransform:st}=t;if(C(r,t),a.add("position","vec3"),r.inputs.add("position",()=>"position"),s.add("vpos","vec3",{invariant:!0}),e.include(z,t),e.include(Qe,t),e.include(Be,t),e.include(Xe,t),!te(h))return e.include(Ye,t),e;e.include(Aa,t),e.include(Ze,t),e.include(Da,t),e.include(Pa,t),U(r,t),e.include(W,t),e.include($);let j=d===0||d===1;return j&&m&&e.include(Ke),e.include(Ia,t),e.include(Ge,t),s.add("vPositionLocal","vec3"),e.include(M,t),e.include(oe,t),e.include(F?Ce:$e,t),r.main.add(i`
    forwardDefaultMaterialExternalColor();

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${p(j,"vNormalWorld = dpNormal(vvLocalNormal(normalModel()));")}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${p(ie,"vTangent = dpTransformVertexTangent(tangent);")}
    gl_Position = transformPosition(proj, view, vpos);
    ${p(j&&m,"gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);")}

    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (shouldCullByOpacity()) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadow();
  `),o.include(Oe,t),o.include(Se,t),e.include(S,t),o.include(O,t),e.include(Ue,t),U(o,t),o.uniforms.add(r.uniforms.get("localOrigin"),new A("ambient",N=>N.ambient),new A("diffuse",N=>N.diffuse)),se&&o.uniforms.add(new w("tex",N=>N.texture)),e.include(Je,t),o.include(Ve,t),e.include(Ra,t),o.include(et,t),o.include(Fe,t),Ne(o),o.uniforms.add(Ie),o.uniforms.add(ze).main.add(i`
    discardBySlice(vpos);
    ${se?i`
            vec4 texColor = texture(tex, ${st?"colorUV":"vuv0"});
            ${p(g,"texColor.rgb /= texColor.a;")}
            discardOrAdjustAlpha(texColor);`:"vec4 texColor = vec4(1.0);"}
    vec3 viewDirection = normalize(vpos - cameraPosition);
    vec3 posWorld = vpos + localOrigin;
    vec3 upNormal = getLocalUp(posWorld);
    ${d===2?"vec3 normal = screenDerivativeNormal(vPositionLocal);":"vec3 normal = shadingNormal(vNormalWorld, viewDirection);"}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(
      ${p(b,"vColor.rgb *")} matColor,
      texColor.rgb,
      vExternalColor.rgb,
      int(colorMixMode)
    );
    float opacity_ = getDefaultMaterialOpacity(texColor.a);

    ${ot?`mat3 tangentSpace = computeTangentSpace(${ie?"normal":"normal, vpos, vuv0"});
           vec3 shadingNormal = computeTextureNormal(tangentSpace, ${it?"normalUV":"vuv0"});`:"vec3 shadingNormal = normal;"}

    ${p(l,i`
          float snow = getSnow(normal, upNormal);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
    ${p((T===1||T===2)&&l,"applySnowToMRR(snow);")}

    vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, upNormal);
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${p(l,", snow")});
  `),e}const ka=Object.freeze(Object.defineProperty({__proto__:null,build:tt},Symbol.toStringTag,{value:"Module"}));class Ba extends ya{constructor(){super(...arguments),this.isSchematic=!1,this.usePBR=!1,this.mrrFactors=da,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.doubleSided=!1,this.doubleSidedType="normal",this.cullFace=2,this.instanced=!1,this.instancedFeatureAttribute=!1,this.instancedColor=!1,this.instanceColorEncodesAlphaIgnore=!1,this.emissiveStrengthFromSymbol=0,this.emissiveStrengthKHR=1,this.emissiveSource=1,this.emissiveBaseColor=we,this.instancedDoublePrecision=!1,this.normalType=0,this.receiveShadows=!0,this.receiveAmbientOcclusion=!0,this.castShadows=!0,this.ambient=ce(.2,.2,.2),this.diffuse=ce(.8,.8,.8),this.externalColor=gt(1,1,1,1),this.colorMixMode="multiply",this.opacity=1,this.layerOpacity=1,this.origin=v(),this.hasSlicePlane=!1,this.offsetTransparentBackfaces=!1,this.vvSize=null,this.vvColor=null,this.vvOpacity=null,this.modelTransformation=null,this.drivenOpacity=!1,this.customDepthTest=0,this.textureAlphaMode=0,this.textureAlphaCutoff=Ee,this.textureAlphaPremultiplied=!1,this.renderOccluded=1,this.testsTransparentRenderOrder=0,this.isDecoration=!1}get emissiveStrength(){return this.emissiveStrengthFromSymbol*this.emissiveStrengthKHR}get hasVVSize(){return!!this.vvSize}get hasVVColor(){return!!this.vvColor}get hasVVOpacity(){return!!this.vvOpacity}}class gr extends Ta{constructor(){super(...arguments),this.origin=v(),this.slicePlaneLocalOrigin=this.origin}get localOrigin(){return this.origin}}let H=class extends jt{constructor(t,e){let a=X(at(e));e.instanced&&e.instancedDoublePrecision&&(a=a.concat(X(Oa(e)))),super(t,e,a),this.shader=new Le(ka,()=>_e(()=>Promise.resolve().then(()=>Ya),void 0)),this.ignoreUnused=!0}_makePipeline(t,e){let{output:a,transparent:r,cullFace:o,customDepthTest:s,hasOccludees:h}=t;return ua({blending:r?Kt(a,!1,t.emissionDimmingPass):null,culling:La(t)?ha(o):null,depthTest:Xt(a,Ua(s)),depthWrite:qt(t),colorWrite:ma,stencilWrite:h?Jt:null,stencilTest:h?e?Qt:Yt:null,polygonOffset:Gt(t)})}initializePipeline(t){return this._occludeePipelineState=this._makePipeline(t,!0),this._makePipeline(t,!1)}getPipeline(t,e,a){return a?this._occludeePipelineState:super.getPipeline(t,e,a)}};H=n([ee("esri.views.3d.webgl-engine.shaders.DefaultMaterialTechnique")],H);function Ua(t){switch(t){case 1:return 515;case 0:return 513;case 2:return 516;case 3:return 514;case 4:return 513}}function La(t){return t.cullFace!==0||!t.hasSlicePlane&&!t.transparent&&!t.doubleSidedMode}function at(t){let e=re().vec3f("position");return t.normalType===1?e.vec2i16("normalCompressed",{glNormalized:!0}):e.vec3f("normal"),t.hasVertexTangents&&e.vec4f("tangent"),t.hasTextures&&e.vec2f16("uv0"),t.hasVertexColors&&e.vec4u8("color",{glNormalized:!0}),t.hasSymbolColors&&e.vec4u8("symbolColor"),!t.instanced&&Ae()&&e.vec4u8("olidColor"),e}class c extends Zt{constructor(e){super(),this.spherical=e,this.alphaDiscardMode=1,this.doubleSidedMode=0,this.pbrMode=0,this.cullFace=0,this.normalType=0,this.customDepthTest=0,this.emissionSource=0,this.hasVertexColors=!1,this.hasSymbolColors=!1,this.hasVerticalOffset=!1,this.hasColorTexture=!1,this.hasMetallicRoughnessTexture=!1,this.hasOcclusionTexture=!1,this.hasNormalTexture=!1,this.hasScreenSizePerspective=!1,this.hasVertexTangents=!1,this.hasOccludees=!1,this.instanced=!1,this.instancedDoublePrecision=!1,this.hasModelTransformation=!1,this.offsetBackfaces=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.receiveShadows=!1,this.hasShadowHighlights=!1,this.receiveAmbientOcclusion=!1,this.receiveGlobalIllumination=!1,this.textureAlphaPremultiplied=!1,this.instancedFeatureAttribute=!1,this.instancedColor=!1,this.writeDepth=!0,this.snowCover=!1,this.hasColorTextureTransform=!1,this.hasEmissionTextureTransform=!1,this.hasNormalTextureTransform=!1,this.hasOcclusionTextureTransform=!1,this.hasMetallicRoughnessTextureTransform=!1,this.useCustomDTRExponentForWater=!1,this.useFillLights=!0,this.draped=!1,this.renderOccluded=!1}get textureCoordinateType(){return+!!this.hasTextures}get hasTextures(){return this.hasColorTexture||this.hasNormalTexture||this.hasMetallicRoughnessTexture||this.emissionSource===3||this.hasOcclusionTexture}get hasVVInstancing(){return this.instanced}}n([u({count:4})],c.prototype,"alphaDiscardMode",void 0),n([u({count:3})],c.prototype,"doubleSidedMode",void 0),n([u({count:8})],c.prototype,"pbrMode",void 0),n([u({count:3})],c.prototype,"cullFace",void 0),n([u({count:3})],c.prototype,"normalType",void 0),n([u({count:4})],c.prototype,"customDepthTest",void 0),n([u({count:8})],c.prototype,"emissionSource",void 0),n([u()],c.prototype,"hasVertexColors",void 0),n([u()],c.prototype,"hasSymbolColors",void 0),n([u()],c.prototype,"hasVerticalOffset",void 0),n([u()],c.prototype,"hasColorTexture",void 0),n([u()],c.prototype,"hasMetallicRoughnessTexture",void 0),n([u()],c.prototype,"hasOcclusionTexture",void 0),n([u()],c.prototype,"hasNormalTexture",void 0),n([u()],c.prototype,"hasScreenSizePerspective",void 0),n([u()],c.prototype,"hasVertexTangents",void 0),n([u()],c.prototype,"hasOccludees",void 0),n([u()],c.prototype,"instanced",void 0),n([u()],c.prototype,"instancedDoublePrecision",void 0),n([u()],c.prototype,"hasModelTransformation",void 0),n([u()],c.prototype,"offsetBackfaces",void 0),n([u()],c.prototype,"hasVVSize",void 0),n([u()],c.prototype,"hasVVColor",void 0),n([u()],c.prototype,"receiveShadows",void 0),n([u()],c.prototype,"hasShadowHighlights",void 0),n([u()],c.prototype,"receiveAmbientOcclusion",void 0),n([u()],c.prototype,"receiveGlobalIllumination",void 0),n([u()],c.prototype,"textureAlphaPremultiplied",void 0),n([u()],c.prototype,"instancedFeatureAttribute",void 0),n([u()],c.prototype,"instancedColor",void 0),n([u()],c.prototype,"writeDepth",void 0),n([u()],c.prototype,"snowCover",void 0),n([u()],c.prototype,"hasColorTextureTransform",void 0),n([u()],c.prototype,"hasEmissionTextureTransform",void 0),n([u()],c.prototype,"hasNormalTextureTransform",void 0),n([u()],c.prototype,"hasOcclusionTextureTransform",void 0),n([u()],c.prototype,"hasMetallicRoughnessTextureTransform",void 0);function rt(t){let e=new We,{attributes:a,vertex:r,fragment:o,varyings:s}=e,{output:h,offsetBackfaces:d,pbrMode:m,snowCover:l}=t,T=m===1||m===2;if(C(r,t),a.add("position","vec3"),r.inputs.add("position",()=>"position"),s.add("vpos","vec3",{invariant:!0}),e.include(z,t),e.include(Qe,t),e.include(Be,t),e.include(Xe,t),!te(h))return e.include(Ye,t),e;e.include(Ze,t),U(e.vertex,t),e.include(W,t),e.include($),d&&e.include(Ke),s.add("vNormalWorld","vec3"),s.add("localvpos","vec3",{invariant:!0}),e.include(M,t),e.include(oe,t),e.include(t.instancedDoublePrecision?Ce:$e,t),r.main.add(i`
    forwardDefaultMaterialExternalColor();

    vpos = getVertexInLocalOriginSpace();

    localvpos = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
    vpos = addVerticalOffset(vpos, localOrigin);
    vec4 basePosition = transformPosition(proj, view, vpos);

    forwardTextureCoordinates();
    forwardColorUV();
    forwardEmissiveUV();
    forwardLinearDepthToReadShadow();

    gl_Position = shouldCullByOpacity() ? vec4(1e38, 1e38, 1e38, 1.0) :
    ${p(d,"offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);","basePosition;")}
  `);let{hasColorTexture:g,hasColorTextureTransform:F}=t;return o.include(Oe,t),o.include(Se,t),e.include(S,t),o.include(O,t),e.include(Ue,t),U(o,t),Ne(o),o.uniforms.add(zt,Ie,r.uniforms.get("localOrigin"),r.uniforms.get("view"),new A("ambient",b=>b.ambient),new A("diffuse",b=>b.diffuse)),g&&o.uniforms.add(new w("tex",b=>b.texture)),e.include(Je,t),o.include(Ve,t),o.include(et,t),o.include(Fe,t),o.uniforms.add(ze).main.add(i`
    discardBySlice(vpos);
    vec4 texColor = ${g?`texture(tex, ${F?"colorUV":"vuv0"})`:" vec4(1.0)"};
    ${p(g,`${p(t.textureAlphaPremultiplied,"texColor.rgb /= texColor.a;")}
      discardOrAdjustAlpha(texColor);`)}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse();
    ssao *= getBakedOcclusion();

    float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
    float shadow = readShadow(additionalAmbientScale, vpos);
    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(
      ${p(t.hasVertexColors,"vColor.rgb * ")} matColor,
      texColor.rgb,
      vExternalColor.rgb,
      int(colorMixMode)
    );
    float opacity_ = getDefaultMaterialOpacity(texColor.a);

    vec3 shadingNormal = normalize(vNormalWorld);
    vec3 viewDirection = normalize(vpos - cameraPosition);
    vec3 upNormal = getLocalUp(vpos, localOrigin);

    ${p(l,`vec3 faceNormal = screenDerivativeNormal(vpos);
        float snow = getRealisticTreeSnow(faceNormal, shadingNormal, upNormal);
        albedo = mix(albedo, vec3(1), snow);`)}

    ${i`albedo *= 1.2;
            vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
            float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
            float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
            float treeRadialFalloff = vColor.r;
            float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
            additionalLight += backLightFactor * mainLightIntensity;`}

    ${p(T&&l,"applySnowToMRR(snow);")}

    vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, upNormal);
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${p(l,", 1.0")});
  `),e}const Ea=Object.freeze(Object.defineProperty({__proto__:null,build:rt},Symbol.toStringTag,{value:"Module"}));let Z=class extends H{constructor(){super(...arguments),this.shader=new Le(Ea,()=>_e(()=>Promise.resolve().then(()=>Ja),void 0))}};Z=n([ee("esri.views.3d.webgl-engine.shaders.RealisticTreeTechnique")],Z);class xr extends ea{constructor(e,a){super(e,Wa),this.materialType="default",this.supportsEdges=!0,this.intersectRayDraped=void 0,this.intersectScreenPolygonDraped=void 0,this.produces=new Map([[2,r=>he(r)&&!this.transparent],[4,r=>he(r)&&this.transparent]]),this._layout=at(this.parameters),this._configuration=new c(a.spherical)}isVisibleForOutput(e){return e===5||e===7||e===6?this.parameters.castShadows:!0}get visible(){let{layerOpacity:e,colorMixMode:a,opacity:r,externalColor:o}=this.parameters,s=a==="replace"?1:r,h=a==="ignore"||isNaN(o[3])?1:o[3];return e*s*h>=Ee}get _hasEmissiveBase(){return!!this.parameters.emissiveTextureId||!xt(this.parameters.emissiveBaseColor,we)}get emissions(){return this.parameters.emissiveStrength>0&&(this.parameters.emissiveSource===0&&this._hasEmissiveBase||this.parameters.emissiveSource===1)?this.transparent?2:1:0}updateConfiguration(e){super.updateConfiguration(e);let{parameters:a,_configuration:r}=this;r.hasNormalTexture=a.hasNormalTexture,r.hasColorTexture=a.hasColorTexture,r.hasMetallicRoughnessTexture=a.hasMetallicRoughnessTexture,r.hasOcclusionTexture=a.hasOcclusionTexture;let{treeRendering:o,doubleSided:s,doubleSidedType:h}=a;r.hasVertexTangents=!o&&a.hasVertexTangents,r.instanced=a.instanced,r.instancedDoublePrecision=a.instancedDoublePrecision,r.hasVVColor=!!a.vvColor,r.hasVVSize=!!a.vvSize,r.hasVerticalOffset=a.verticalOffset!=null,r.hasScreenSizePerspective=a.screenSizePerspective!=null,r.hasSlicePlane=a.hasSlicePlane,r.alphaDiscardMode=a.textureAlphaMode,r.normalType=o?0:a.normalType,r.transparent=this.transparent,r.enableOITOffset=e.enableOITOffset,r.customDepthTest=a.customDepthTest??0,r.hasOccludees=e.hasOccludees,r.cullFace=a.hasSlicePlane?0:a.cullFace,r.hasModelTransformation=!o&&a.modelTransformation!=null,r.hasVertexColors=a.hasVertexColors,r.hasSymbolColors=a.hasSymbolColors,r.doubleSidedMode=o?2:s&&h==="normal"?1:s&&h==="winding-order"?2:0,r.instancedFeatureAttribute=a.instancedFeatureAttribute,r.instancedColor=a.instancedColor,te(e.output)?(r.receiveShadows=a.receiveShadows,r.hasShadowHighlights=Rt(r,e),r.receiveAmbientOcclusion=a.receiveAmbientOcclusion&&e.ssao!=null,r.receiveGlobalIllumination=a.receiveAmbientOcclusion&&e.globalIlluminationEnabled):r.receiveShadows=r.hasShadowHighlights=r.receiveAmbientOcclusion=r.receiveGlobalIllumination=!1,r.textureAlphaPremultiplied=!!a.textureAlphaPremultiplied,r.pbrMode=a.usePBR?a.unlit?7:a.isSchematic?2:1:0,r.emissionSource=a.emissionSource,r.offsetBackfaces=!!(this.transparent&&a.offsetTransparentBackfaces),r.snowCover=e.snowCover>0,r.hasColorTextureTransform=!!a.colorTextureTransformMatrix,r.hasNormalTextureTransform=!!a.normalTextureTransformMatrix,r.hasEmissionTextureTransform=!!a.emissiveTextureTransformMatrix,r.hasOcclusionTextureTransform=!!a.occlusionTextureTransformMatrix,r.hasMetallicRoughnessTextureTransform=!!a.metallicRoughnessTextureTransformMatrix}intersectRay(e,a,r,o,s,h){let d=this._getMaterialVerticalOffset(a,r);d!=null&&(o=q(ja,o,d),s=q(Ga,s,d)),h=ta(h,this._configuration,o,s),sa(e,r,o,s,aa(r.verticalOffset),h)}intersectScreenPolygon(e,a,r,o){return ra(oa(e,r,a,o,this._createScreenPolygonVertexDisplacement(a,r)),this._configuration,r.camera.eye)}createGLMaterial(e){return new Ha(e)}createBufferWriter(){return new na(this._layout)}get transparent(){let{drivenOpacity:e,opacity:a,externalColor:r,layerOpacity:o,texture:s,textureId:h,textureAlphaMode:d,colorMixMode:m}=this.parameters,l=r[3];return e||a<1&&m!=="replace"||l<1&&m!=="ignore"||o<1||(s!=null||h!=null)&&d!==1&&d!==2&&m!=="replace"}_createScreenPolygonVertexDisplacement(e,a){let r=this._getMaterialVerticalOffset(e,a);return r==null?null:{applyToVertex:(o,s,h,d)=>(o[0]=s+r[0],o[1]=h+r[1],o[2]=d+r[2],o),applyToAabb:o=>(yt(o,de(k,Tt(o,k),r)),wt(o,de(k,_t(o,k),r)),o)}}_getMaterialVerticalOffset(e,a){if(this.parameters.verticalOffset==null)return null;let r=a.camera;R(Q,e[12],e[13],e[14]);let o=null;switch(a.viewingMode){case 1:o=Mt(xe,Q);break;case 2:o=bt(xe,qa)}let s=q(Ka,Q,r.eye),h=Ct(s),d=ue(s,s,1/h),m=null;this.parameters.screenSizePerspective&&(m=$t(o,d));let l=ia(r,h,this.parameters.verticalOffset,m??0,this.parameters.screenSizePerspective,null);return ue(o,o,l),Ot(Qa,o,a.transform.inverseRotation)}}class Ha extends At{constructor(e){super({...e,...e.material.parameters})}beginSlot(e){this._material.setParameters({receiveShadows:e.shadowMap.enabled});let a=this._material.parameters;this.updateTexture(a.textureId);let r=e.camera.viewInverseTransposeMatrix;return R(a.origin,r[3],r[7],r[11]),this._material.setParameters(this.textureBindParameters),this.getTechnique(a.treeRendering?Z:H,e)}}class Wa extends Ba{constructor(){super(...arguments),this.treeRendering=!1,this.useIndexing=!1,this.hasVertexTangents=!1,this.unlit=!1}get hasNormalTexture(){return!this.treeRendering&&!!this.normalTextureId}get hasColorTexture(){return!!this.textureId}get hasMetallicRoughnessTexture(){return!this.treeRendering&&!!this.metallicRoughnessTextureId}get hasOcclusionTexture(){return!this.treeRendering&&!!this.occlusionTextureId}get emissionSource(){return this.emissiveTextureId!=null&&this.emissiveSource===0?3:this.emissiveSource===0?2:1}get hasTextures(){return this.hasColorTexture||this.hasNormalTexture||this.hasMetallicRoughnessTexture||this.emissionSource===3||this.hasOcclusionTexture}}const ja=v(),Ga=v(),qa=St(0,0,1),xe=v(),Q=v(),Ka=v(),Qa=v(),k=v(),Ya=Object.freeze(Object.defineProperty({__proto__:null,build:tt},Symbol.toStringTag,{value:"Module"})),Ja=Object.freeze(Object.defineProperty({__proto__:null,build:rt},Symbol.toStringTag,{value:"Module"}));export{xr as F,gr as O,I as S,Fa as a,Je as b,Ra as c,vr as d,La as j,Oa as p,et as r,Ke as t};
