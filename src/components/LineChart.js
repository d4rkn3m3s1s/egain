import React, { useEffect, useRef } from 'react';

const LineChart = ({ data, width, height, label = 'Activity', color = '#FFEB3B' }) => {
  const canvasRef = useRef(null);

  // Find the max value in the data for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Set the actual dimensions for the canvas
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    // Scale the canvas correctly
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (data.length < 2) return;
    
    // Calculate scales
    const horizontalPadding = 20;
    const verticalPadding = 20;
    const chartWidth = width - (horizontalPadding * 2);
    const chartHeight = height - (verticalPadding * 2);
    
    const xStep = chartWidth / (data.length - 1);
    const yScale = chartHeight / (maxValue || 1); // Avoid division by zero
    
    // Draw the grid
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
    
    // Horizontal grid lines (5 lines)
    for (let i = 0; i <= 5; i++) {
      const y = verticalPadding + (chartHeight - (chartHeight / 5) * i);
      ctx.beginPath();
      ctx.moveTo(horizontalPadding, y);
      ctx.lineTo(width - horizontalPadding, y);
      ctx.stroke();
    }
    
    // Draw x-axis labels
    ctx.fillStyle = '#999';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    data.forEach((item, index) => {
      const x = horizontalPadding + (xStep * index);
      ctx.fillText(item.label, x, height - 5);
    });
    
    // Draw the line
    ctx.beginPath();
    ctx.moveTo(
      horizontalPadding, 
      height - verticalPadding - (data[0].value * yScale)
    );
    
    data.forEach((item, index) => {
      const x = horizontalPadding + (xStep * index);
      const y = height - verticalPadding - (item.value * yScale);
      ctx.lineTo(x, y);
    });
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points on the line
    data.forEach((item, index) => {
      const x = horizontalPadding + (xStep * index);
      const y = height - verticalPadding - (item.value * yScale);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    });
    
    // Draw y-axis labels
    ctx.fillStyle = '#999';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * i);
      const y = height - verticalPadding - ((maxValue / 5) * i * yScale);
      ctx.fillText(value.toString(), horizontalPadding - 5, y + 3);
    }
    
    // Draw the label
    ctx.fillStyle = '#666';
    ctx.font = '11px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(label, horizontalPadding, 15);
    
  }, [data, width, height, maxValue, color, label]);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        display: 'block',
        borderRadius: '4px'
      }}
    />
  );
};

export default LineChart; 