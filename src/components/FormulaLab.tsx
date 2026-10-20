import React, { useState } from 'react';
import { Calculator, CheckCircle2, Lightbulb, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export const FormulaLab: React.FC = () => {
  // EOQ Calculator inputs
  const [demandD, setDemandD] = useState<number>(10000);
  const [orderCostS, setOrderCostS] = useState<number>(1500);
  const [holdingCostH, setHoldingCostH] = useState<number>(12);

  // Stock Control Level inputs
  const [maxUsage, setMaxUsage] = useState<number>(80);
  const [minUsage, setMinUsage] = useState<number>(30);
  const [normalUsage, setNormalUsage] = useState<number>(55);
  const [maxLeadTime, setMaxLeadTime] = useState<number>(14);
  const [minLeadTime, setMinLeadTime] = useState<number>(5);
  const [normalLeadTime, setNormalLeadTime] = useState<number>(9);

  // EOQ Calculations
  const eoq = Math.round(Math.sqrt((2 * demandD * orderCostS) / Math.max(0.01, holdingCostH)));
  const ordersPerYear = (demandD / Math.max(1, eoq)).toFixed(1);
  const annualOrderingCost = Math.round((demandD / Math.max(1, eoq)) * orderCostS);
  const annualHoldingCost = Math.round((eoq / 2) * holdingCostH);
  const totalCost = annualOrderingCost + annualHoldingCost;

  // Stock Level Calculations
  const rol = maxUsage * maxLeadTime;
  const minStock = rol - normalUsage * normalLeadTime;
  const maxStock = rol + eoq - minUsage * minLeadTime;
  const avgStock = Math.round(minStock + eoq / 2);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-amber-950/30 border border-slate-800">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            KNEC SCM503
          </span>
          <span className="text-xs text-slate-400">Inventory Mathematical Modeling Laboratory</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Formula & Calculation Simulator</h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Solve EOQ, batch sizing, stock thresholds, and total inventory costs dynamically. Master the exact mathematical
          steps rewarded by KNEC examiners in Section B numerical questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* EOQ Interactive Calculator */}
        <div className="p-6 rounded-2xl bg-slate-850 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              Economic Order Quantity (EOQ) Solver
            </h2>
            <span className="text-xs font-mono text-emerald-400 font-bold">EOQ = √(2DS/H)</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Annual Demand (D) in units:
              </label>
              <input
                type="number"
                value={demandD}
                onChange={(e) => setDemandD(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Cost per Order (S) in KES:
              </label>
              <input
                type="number"
                value={orderCostS}
                onChange={(e) => setOrderCostS(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                Holding Cost per Unit per Annum (H) in KES:
              </label>
              <input
                type="number"
                value={holdingCostH}
                onChange={(e) => setHoldingCostH(Math.max(0.1, Number(e.target.value)))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Results Display */}
          <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Calculation Output & Derivation:
            </div>

            <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800">
              <span className="text-slate-300">Optimal Order Size (EOQ):</span>
              <span className="text-lg font-mono font-extrabold text-amber-300">{eoq.toLocaleString()} units</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-2.5 rounded bg-slate-850 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Orders Per Year:</span>
                <span className="text-white font-mono font-bold text-sm">{ordersPerYear} orders</span>
              </div>
              <div className="p-2.5 rounded bg-slate-850 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Order Cycle Time:</span>
                <span className="text-white font-mono font-bold text-sm">
                  {Math.round(250 / Number(ordersPerYear))} working days
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-slate-850 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Annual Ordering Cost:</span>
                <span className="text-cyan-400 font-mono font-bold">KES {annualOrderingCost.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-850 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Annual Holding Cost:</span>
                <span className="text-emerald-400 font-mono font-bold">KES {annualHoldingCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-bold">Total Annual Inventory Cost:</span>
              <span className="text-base font-extrabold text-emerald-300 font-mono">
                KES {totalCost.toLocaleString()}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Notice: At EOQ, Annual Ordering Cost (KES {annualOrderingCost.toLocaleString()}) and Annual Holding Cost (KES {annualHoldingCost.toLocaleString()}) are virtually balanced.
            </p>
          </div>
        </div>

        {/* Stock Level Control Simulator */}
        <div className="p-6 rounded-2xl bg-slate-850 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-400" />
              Stock Control Levels Simulator
            </h2>
            <span className="text-xs font-mono text-amber-400 font-bold">ROL, Min & Max</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Max Daily Usage:</label>
              <input
                type="number"
                value={maxUsage}
                onChange={(e) => setMaxUsage(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Max Lead Time (days):</label>
              <input
                type="number"
                value={maxLeadTime}
                onChange={(e) => setMaxLeadTime(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Normal Daily Usage:</label>
              <input
                type="number"
                value={normalUsage}
                onChange={(e) => setNormalUsage(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Normal Lead Time (days):</label>
              <input
                type="number"
                value={normalLeadTime}
                onChange={(e) => setNormalLeadTime(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Min Daily Usage:</label>
              <input
                type="number"
                value={minUsage}
                onChange={(e) => setMinUsage(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Min Lead Time (days):</label>
              <input
                type="number"
                value={minLeadTime}
                onChange={(e) => setMinLeadTime(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 font-mono"
              />
            </div>
          </div>

          {/* Stock Level Results */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Calculated KNEC Stock Control Thresholds:
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded bg-slate-850 border border-slate-800">
                <div>
                  <span className="font-bold text-white block">Reorder Level (ROL):</span>
                  <span className="text-[11px] text-slate-400 font-mono">Max Usage × Max Lead Time</span>
                </div>
                <span className="text-base font-extrabold text-amber-400 font-mono">{rol} units</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-slate-850 border border-slate-800">
                <div>
                  <span className="font-bold text-white block">Minimum Stock (Safety Buffer):</span>
                  <span className="text-[11px] text-slate-400 font-mono">ROL - (Normal Usage × Normal Lead Time)</span>
                </div>
                <span className="text-base font-extrabold text-cyan-400 font-mono">{minStock} units</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-slate-850 border border-slate-800">
                <div>
                  <span className="font-bold text-white block">Maximum Stock Level:</span>
                  <span className="text-[11px] text-slate-400 font-mono">ROL + EOQ - (Min Usage × Min Lead Time)</span>
                </div>
                <span className="text-base font-extrabold text-purple-400 font-mono">{maxStock} units</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KNEC Model Problem Step-by-Step Guide */}
      <div className="p-6 rounded-2xl bg-slate-850 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          KNEC Examiner Guide: How to Earn Full Marks in Calculation Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400 block">1. State the Formula First</span>
            <p className="leading-relaxed">
              KNEC marking schemes always award 1 compulsory mark just for writing the general formula before substituting numbers.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-400 block">2. Show Substitution Step</span>
            <p className="leading-relaxed">
              Do not jump directly from formula to answer. Show clear numbers substituted inside the square root or equation.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-400 block">3. State the Unit of Measure</span>
            <p className="leading-relaxed">
              Always attach units to the final answer: e.g. "1,581 cartons", "KES 45,000", or "12 days". Numbers without units lose marks!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
