const $=id=>document.getElementById(id);
$('calcForm').addEventListener('submit',e=>{e.preventDefault();
 const item=$('item').value.trim()||'Goal', P=+$('price').value, salary=+$('salary').value, spending=+$('spending').value, daily=+$('dailySavings').value, down=Math.min(+$('downPayment').value||0,P), roi=Math.max(0,+$('roi').value||0), n=Math.max(1,Math.round(+$('months').value||12));
 if(P<0||salary<0||spending<0||daily<=0||down>P){alert('Please enter valid values. Daily savings must be greater than 0 and down payment cannot exceed price.');return;}
 const monthlyFree=salary-spending, cashBalance=P-down, days=Math.ceil(cashBalance/daily), cashMonths=(days/30.4375).toFixed(1);
 let emi=0; if(cashBalance>0){const r=roi/100/12; emi=r===0?cashBalance/n:cashBalance*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);}
 const fmt=x=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(x);
 $('result').hidden=false; $('result').innerHTML=`<h3>Result for ${item}</h3><p><b>Price:</b> ${fmt(P)}</p><p><b>After down payment:</b> ${fmt(cashBalance)}</p><p><b>Saving time:</b> ${days} days (about ${cashMonths} months)</p><p><b>Monthly salary:</b> ${fmt(salary)}</p><p><b>Monthly spending:</b> ${fmt(spending)}</p><p><b>Monthly balance:</b> ${fmt(monthlyFree)}</p><p><b>Estimated EMI:</b> ${fmt(emi)} / month for ${n} months at ${roi}% yearly ROI</p>${monthlyFree<=0?'<p class="warning"><b>Note:</b> Your salary does not currently exceed monthly spending.</p>':''}`;
});
