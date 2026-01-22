const elements = {
  costPerKg: document.querySelector('#cost-per-kg'),
  weightG: document.querySelector('#weight-g'),
  printHours: document.querySelector('#print-hours'),
  printMinutes: document.querySelector('#print-minutes'),
  laborMinutes: document.querySelector('#labor-minutes'),
  hardwareCost: document.querySelector('#hardware-cost'),
  packagingCost: document.querySelector('#packaging-cost'),
  vatRate: document.querySelector('#vat-rate'),
  marginSlider: document.querySelector('#margin-slider'),
  laborRate: document.querySelector('#labor-rate'),
  materialEfficiency: document.querySelector('#material-efficiency'),
  printerCost: document.querySelector('#printer-cost'),
  additionalCosts: document.querySelector('#additional-costs'),
  yearlyMaintenance: document.querySelector('#yearly-maintenance'),
  lifetimeYears: document.querySelector('#lifetime-years'),
  utilizationRate: document.querySelector('#utilization-rate'),
  powerConsumption: document.querySelector('#power-consumption'),
  electricityCost: document.querySelector('#electricity-cost'),
  bufferFactor: document.querySelector('#buffer-factor'),
  totalWeight: document.querySelector('[data-output="total-weight"]'),
  materialCost: document.querySelector('[data-output="material-cost"]'),
  laborCost: document.querySelector('[data-output="labor-cost"]'),
  machineCost: document.querySelector('[data-output="machine-cost"]'),
  totalCost: document.querySelector('[data-output="total-cost"]'),
  donutTotal: document.querySelector('[data-output="donut-total"]'),
  legendLabor: document.querySelector('[data-output="legend-labor"]'),
  legendMaterial: document.querySelector('[data-output="legend-material"]'),
  legendMachine: document.querySelector('[data-output="legend-machine"]'),
  legendPower: document.querySelector('[data-output="legend-power"]'),
  legendLaborPercent: document.querySelector('[data-output="legend-labor-percent"]'),
  legendMaterialPercent: document.querySelector('[data-output="legend-material-percent"]'),
  legendMachinePercent: document.querySelector('[data-output="legend-machine-percent"]'),
  legendPowerPercent: document.querySelector('[data-output="legend-power-percent"]'),
  footTotal: document.querySelector('[data-output="foot-total"]'),
  footLargest: document.querySelector('[data-output="foot-largest"]'),
  price25: document.querySelector('[data-output="price-25"]'),
  price25Vat: document.querySelector('[data-output="price-25-vat"]'),
  price40: document.querySelector('[data-output="price-40"]'),
  price40Vat: document.querySelector('[data-output="price-40-vat"]'),
  price60: document.querySelector('[data-output="price-60"]'),
  price60Vat: document.querySelector('[data-output="price-60-vat"]'),
  price80: document.querySelector('[data-output="price-80"]'),
  price80Vat: document.querySelector('[data-output="price-80-vat"]'),
  priceCustom: document.querySelector('[data-output="price-custom"]'),
  priceCustomVat: document.querySelector('[data-output="price-custom-vat"]'),
  marginLabel: document.querySelector('[data-output="margin-label"]'),
  selectedPrice: document.querySelector('[data-output="selected-price"]'),
  selectedMargin: document.querySelector('[data-output="selected-margin"]'),
  sliderFill: document.querySelector('.slider .fill'),
  sliderThumb: document.querySelector('.slider .thumb'),
  donut: document.querySelector('.donut'),
  totalInvestment: document.querySelector('[data-output="total-investment"]'),
  lifetimeCosts: document.querySelector('[data-output="lifetime-costs"]'),
  estimatedHours: document.querySelector('[data-output="estimated-hours"]'),
  depreciationPerHour: document.querySelector('[data-output="depreciation-per-hour"]'),
  maintenancePerHour: document.querySelector('[data-output="maintenance-per-hour"]'),
  powerPerHour: document.querySelector('[data-output="power-per-hour"]'),
  totalMachinePerHour: document.querySelector('[data-output="total-machine-per-hour"]'),
  currencyButton: document.querySelector('[data-currency-button]'),
  currencyLabels: document.querySelectorAll('[data-currency-label]'),
  themeToggle: document.querySelector('[data-theme-toggle]'),
  advancedSettings: document.querySelector('.advanced-settings'),
};

const currencies = {
  CHF: {
    locale: 'de-CH',
    code: 'CHF',
    label: 'CHF',
    perHour: 'CHF/hr',
    perKwh: 'CHF/kWh',
  },
  EUR: {
    locale: 'de-DE',
    code: 'EUR',
    label: 'EUR',
    perHour: 'EUR/hr',
    perKwh: 'EUR/kWh',
  },
  USD: {
    locale: 'en-US',
    code: 'USD',
    label: 'USD',
    perHour: 'USD/hr',
    perKwh: 'USD/kWh',
  },
};

const state = {
  currency: 'CHF',
  theme: 'dark',
};

const getNumberFormatter = () => {
  const { locale } = currencies[state.currency];
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatCurrency = (value) => {
  const formatter = getNumberFormatter();
  return `${formatter.format(value)} ${currencies[state.currency].code}`;
};

const formatNumber = (value) => getNumberFormatter().format(value);
};

const rates = {
  laborPerHour: 20,
  machinePerHour: 0.13,
  powerPerHour: 0.03,
};

const formatter = new Intl.NumberFormat('de-CH', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatCurrency = (value) => `${formatter.format(value)} CHF`;

const readNumber = (input) => {
  const value = Number.parseFloat(input.value);
  return Number.isNaN(value) ? 0 : value;
};

const updatePrices = (totalCost, vatRate, marginPercent, outputs) => {
  const margin = marginPercent / 100;
  const net = totalCost / (1 - margin);
  const gross = net * (1 + vatRate / 100);
  outputs.net.textContent = formatCurrency(net);
  outputs.gross.textContent = `${formatCurrency(gross)} inkl. MwSt`;
  outputs.net.textContent = formatter.format(net);
  outputs.gross.textContent = `${formatter.format(gross)} CHF inkl. MwSt`;
};

const update = () => {
  const costPerKg = readNumber(elements.costPerKg);
  const weightG = readNumber(elements.weightG);
  const printHours = readNumber(elements.printHours);
  const printMinutes = readNumber(elements.printMinutes);
  const laborMinutes = readNumber(elements.laborMinutes);
  const hardwareCost = readNumber(elements.hardwareCost);
  const packagingCost = readNumber(elements.packagingCost);
  const vatRate = readNumber(elements.vatRate);
  const marginPercent = readNumber(elements.marginSlider);
  const laborRate = readNumber(elements.laborRate);
  const materialEfficiency = readNumber(elements.materialEfficiency) || 1;
  const printerCost = readNumber(elements.printerCost);
  const additionalCosts = readNumber(elements.additionalCosts);
  const yearlyMaintenance = readNumber(elements.yearlyMaintenance);
  const lifetimeYears = readNumber(elements.lifetimeYears) || 1;
  const utilizationRate = readNumber(elements.utilizationRate);
  const powerConsumption = readNumber(elements.powerConsumption);
  const electricityCost = readNumber(elements.electricityCost);
  const bufferFactor = readNumber(elements.bufferFactor) || 1;

  const totalWeight = weightG;
  const materialCost = (weightG / 1000) * costPerKg * materialEfficiency;
  const printTimeHours = printHours + printMinutes / 60;
  const laborHours = laborMinutes / 60;
  const laborCost = laborHours * laborRate;
  const totalInvestment = printerCost + additionalCosts;
  const estimatedHoursPerYear = 8760 * (utilizationRate / 100);
  const totalLifetimeHours = Math.max(estimatedHoursPerYear * lifetimeYears, 1);
  const depreciationPerHour = totalInvestment / totalLifetimeHours;
  const maintenancePerHour = yearlyMaintenance / Math.max(estimatedHoursPerYear, 1);
  const powerPerHour = (powerConsumption / 1000) * electricityCost;
  const machineRateBase = (depreciationPerHour + maintenancePerHour) * bufferFactor;
  const machineCost = printTimeHours * machineRateBase;
  const powerCost = printTimeHours * powerPerHour;
  const totalCost = materialCost + laborCost + machineCost + powerCost + hardwareCost + packagingCost;

  elements.totalWeight.textContent = formatNumber(totalWeight);

  const totalWeight = weightG;
  const materialCost = (weightG / 1000) * costPerKg;
  const printTimeHours = printHours + printMinutes / 60;
  const laborHours = laborMinutes / 60;
  const laborCost = laborHours * rates.laborPerHour;
  const machineCost = printTimeHours * rates.machinePerHour;
  const powerCost = printTimeHours * rates.powerPerHour;
  const totalCost = materialCost + laborCost + machineCost + powerCost + hardwareCost + packagingCost;

  elements.totalWeight.textContent = formatter.format(totalWeight);
  elements.materialCost.textContent = formatCurrency(materialCost);
  elements.laborCost.textContent = formatCurrency(laborCost);
  elements.machineCost.textContent = formatCurrency(machineCost);
  elements.totalCost.textContent = formatCurrency(totalCost);
  elements.donutTotal.textContent = formatCurrency(totalCost);
  elements.footTotal.textContent = formatCurrency(totalCost);

  elements.legendLabor.textContent = formatCurrency(laborCost);
  elements.legendMaterial.textContent = formatCurrency(materialCost);
  elements.legendMachine.textContent = formatCurrency(machineCost);
  elements.legendPower.textContent = formatCurrency(powerCost);

  const segments = [
    { label: 'Arbeit', value: laborCost, color: '#4b8bff' },
    { label: 'Material', value: materialCost, color: '#37c172' },
    { label: 'Maschine', value: machineCost, color: '#f2b24c' },
    { label: 'Strom', value: powerCost, color: '#f05a5a' },
  ];

  const totalDistribution = segments.reduce((sum, item) => sum + item.value, 0) || 1;
  segments.forEach((segment) => {
    segment.percent = (segment.value / totalDistribution) * 100;
  });

  elements.legendLaborPercent.textContent = `${segments[0].percent.toFixed(1)}%`;
  elements.legendMaterialPercent.textContent = `${segments[1].percent.toFixed(1)}%`;
  elements.legendMachinePercent.textContent = `${segments[2].percent.toFixed(1)}%`;
  elements.legendPowerPercent.textContent = `${segments[3].percent.toFixed(1)}%`;

  const largest = segments.reduce((max, current) => (current.value > max.value ? current : max), segments[0]);
  elements.footLargest.textContent = `Größte: ${largest.label} (${largest.percent.toFixed(1)}%)`;

  let angle = 0;
  const gradientStops = segments.map((segment) => {
    const start = angle;
    angle += segment.percent * 3.6;
    return `${segment.color} ${start}deg ${angle}deg`;
  });
  elements.donut.style.background = `conic-gradient(${gradientStops.join(', ')})`;

  updatePrices(totalCost, vatRate, 25, { net: elements.price25, gross: elements.price25Vat });
  updatePrices(totalCost, vatRate, 40, { net: elements.price40, gross: elements.price40Vat });
  updatePrices(totalCost, vatRate, 60, { net: elements.price60, gross: elements.price60Vat });
  updatePrices(totalCost, vatRate, 80, { net: elements.price80, gross: elements.price80Vat });

  const marginLabel = `${marginPercent.toFixed(0)}% Gewinnmarge`;
  elements.marginLabel.textContent = marginLabel;
  elements.selectedMargin.textContent = marginLabel;

  const margin = marginPercent / 100;
  const net = totalCost / (1 - margin);
  const gross = net * (1 + vatRate / 100);
  elements.priceCustom.textContent = formatCurrency(net);
  elements.priceCustomVat.textContent = `${formatCurrency(gross)} inkl. MwSt`;
  elements.selectedPrice.textContent = `Ausgewählt: ${formatCurrency(gross)} inkl. MwSt`;
  elements.priceCustom.textContent = formatter.format(net);
  elements.priceCustomVat.textContent = `${formatter.format(gross)} CHF inkl. MwSt`;
  elements.selectedPrice.textContent = `Ausgewählt: ${formatter.format(gross)} CHF inkl. MwSt`;

  const sliderPercent = (marginPercent - Number(elements.marginSlider.min)) /
    (Number(elements.marginSlider.max) - Number(elements.marginSlider.min));
  const sliderPercentValue = sliderPercent * 100;
  elements.sliderFill.style.width = `${sliderPercentValue}%`;
  elements.sliderThumb.style.left = `${sliderPercentValue}%`;

  const lifetimeCosts = totalInvestment + yearlyMaintenance * lifetimeYears;
  elements.totalInvestment.textContent = formatCurrency(totalInvestment);
  elements.lifetimeCosts.textContent = formatCurrency(lifetimeCosts);
  elements.estimatedHours.textContent = `${Math.round(estimatedHoursPerYear)} hrs/year`;
  elements.depreciationPerHour.textContent = `${formatCurrency(depreciationPerHour)}/hr`;
  elements.maintenancePerHour.textContent = `${formatCurrency(maintenancePerHour)}/hr`;
  elements.powerPerHour.textContent = `${formatCurrency(powerPerHour)}/hr`;
  elements.totalMachinePerHour.textContent = `${formatCurrency(machineRateBase + powerPerHour)}/hr`;
};

[
  elements.costPerKg,
  elements.weightG,
  elements.printHours,
  elements.printMinutes,
  elements.laborMinutes,
  elements.hardwareCost,
  elements.packagingCost,
  elements.vatRate,
  elements.marginSlider,
  elements.laborRate,
  elements.materialEfficiency,
  elements.printerCost,
  elements.additionalCosts,
  elements.yearlyMaintenance,
  elements.lifetimeYears,
  elements.utilizationRate,
  elements.powerConsumption,
  elements.electricityCost,
  elements.bufferFactor,
].forEach((input) => {
  input.addEventListener('input', update);
});

const updateCurrencyUI = () => {
  const currency = currencies[state.currency];
  elements.currencyButton.textContent = currency.label;
  elements.currencyLabels.forEach((label) => {
    const type = label.dataset.currencyLabel;
    if (type === 'per-hour') {
      label.textContent = currency.perHour;
    } else if (type === 'per-kwh') {
      label.textContent = currency.perKwh;
    } else {
      label.textContent = currency.label;
    }
  });
  update();
};

const toggleTheme = () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = state.theme;
  elements.themeToggle.textContent = state.theme === 'dark' ? '🌙' : '☀️';
};

elements.currencyButton.addEventListener('click', () => {
  const keys = Object.keys(currencies);
  const currentIndex = keys.indexOf(state.currency);
  state.currency = keys[(currentIndex + 1) % keys.length];
  updateCurrencyUI();
});

elements.themeToggle.addEventListener('click', () => {
  toggleTheme();
});

elements.advancedSettings.querySelector('summary').addEventListener('click', (event) => {
  event.preventDefault();
  elements.advancedSettings.open = !elements.advancedSettings.open;
});

document.body.dataset.theme = state.theme;
elements.themeToggle.textContent = state.theme === 'dark' ? '🌙' : '☀️';
updateCurrencyUI();
update();
