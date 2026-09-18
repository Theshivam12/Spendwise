document.getElementById('calculatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const item = document.getElementById('item').value.trim();
    const price = Number(document.getElementById('price').value);
    const salary = Number(document.getElementById('salary').value);
    const dailySavings = Number(document.getElementById('savings').value);
    const monthlySpending = Number(document.getElementById('monthly_spending').value);
    const downPayment = Number(document.getElementById('down_payment').value) || 0;
    const roi = Number(document.getElementById('roi').value) || 0;
    const months = Number(document.getElementById('months').value) || 0;

    const resultPanel = document.getElementById('resultPanel');
    const money = value => '₹' + Number(value).toLocaleString('en-IN', { maximumFractionDigits: 2 });
    const loanAmount = Math.max(price - downPayment, 0);
    const remainingMoney = salary - monthlySpending;
    const dailyWage = salary / 22;

    let html = `<h2>Analysis for ${escapeHtml(item)}</h2>`;

    if (remainingMoney > 0) {
        const monthsNeeded = Math.ceil(price / remainingMoney);
        html += `
        <div class="res-item">
            <label>Time Required Based on Salary</label>
            <span class="highlight">${monthsNeeded} Months</span>
            <p class="sub-text">Your salary is ${money(salary)} and monthly spending is ${money(monthlySpending)}. You can save ${money(remainingMoney)} per month, so you need ${monthsNeeded} months to afford this product.</p>
        </div>`;
    } else {
        html += `
        <div class="res-item">
            <label>Financial Warning</label>
            <span class="highlight">Not Possible</span>
            <p class="warning">⚠️ Your monthly spending is equal to or greater than your salary. You currently have no savings.</p>
        </div>`;
    }

    if (dailySavings > 0) {
        const waitTime = Math.ceil(loanAmount / dailySavings);
        html += `
        <div class="res-item">
            <label>Cash Purchase Timeline</label>
            <span class="highlight">${waitTime} Days</span>
            <p class="sub-text">Days needed to save the balance ${money(loanAmount)} (${money(price)} - ${money(downPayment)}) at your current daily savings rate.</p>
        </div>`;
    }

    if (loanAmount > 0 && roi > 0 && months > 0) {
        const monthlyRate = (roi / 12) / 100;
        const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
        html += `
        <div class="res-item">
            <label>Monthly Debt Burden</label>
            <span class="highlight">${money(emi)} / month</span>
            ${dailyWage > 0 ? `<p class="sub-text">Approx. ${((emi / dailyWage)).toFixed(1)} work days of your salary per EMI.</p>` : ''}
        </div>`;
    }

    if (loanAmount === 0) {
        html += `
        <div class="res-item">
            <label>Financing</label>
            <span class="highlight">Fully Covered</span>
            <p class="sub-text">Your down payment covers the full purchase price.</p>
        </div>`;
    }

    resultPanel.innerHTML = html;
});

function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[character]));
}
