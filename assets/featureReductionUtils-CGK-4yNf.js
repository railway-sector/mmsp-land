function a(l,n){let e=l.featureReduction;return!e||e.type==="selection"?null:!("maxScale"in e)||!e.maxScale||e.maxScale<n.scale?e:null}export{a as e};
