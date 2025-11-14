/**
 * Script para analizar palabras clave en los artículos del blog
 * Ejecuta: npm run analyze-keywords
 */

const fs = require('fs');
const path = require('path');

// Leer el archivo SQL con los artículos
const blogArticlesPath = path.join(__dirname, '..', 'blog-articles.sql');
const content = fs.readFileSync(blogArticlesPath, 'utf-8');

// Extraer títulos, descripciones y keywords de los artículos
const articles = [];

// Dividir por INSERT INTO
const inserts = content.split(/INSERT INTO blog_posts/).filter(part => part.trim().startsWith('('));

inserts.forEach(insert => {
  const valuesMatch = insert.match(/\(([\s\S]+?)\);/);
  if (!valuesMatch) return;
  
  const values = valuesMatch[1];
  
  // Extraer título (primer campo entre comillas simples)
  const titleMatch = values.match(/^\s*'([^']*(?:''[^']*)*)'/);
  const title = titleMatch ? titleMatch[1].replace(/''/g, "'") : '';
  
  // Extraer excerpt (tercer campo, después de slug)
  const fields = [];
  let currentField = '';
  let inQuotes = false;
  let quoteChar = null;
  
  for (let i = 0; i < values.length; i++) {
    const char = values[i];
    const nextChar = values[i + 1];
    
    if (!inQuotes && (char === "'" || char === '"')) {
      inQuotes = true;
      quoteChar = char;
      currentField += char;
    } else if (inQuotes && char === quoteChar && nextChar !== quoteChar) {
      inQuotes = false;
      currentField += char;
      fields.push(currentField);
      currentField = '';
      quoteChar = null;
    } else if (inQuotes && char === quoteChar && nextChar === quoteChar) {
      currentField += char + nextChar;
      i++; // Skip next char
    } else {
      currentField += char;
    }
  }
  
  const excerpt = fields[2] ? fields[2].replace(/^'|'$/g, '').replace(/''/g, "'") : '';
  
  // Buscar ARRAY de keywords
  const arrayMatch = values.match(/ARRAY\[([^\]]+)\]/);
  let keywords = [];
  if (arrayMatch) {
    const arrayContent = arrayMatch[1];
    const keywordRegex = /'([^']+)'/g;
    let keywordMatch;
    while ((keywordMatch = keywordRegex.exec(arrayContent)) !== null) {
      keywords.push(keywordMatch[1]);
    }
  }
  
  if (title) {
    articles.push({ title, excerpt, keywords });
  }
});

// Análisis de palabras clave
const keywordFrequency = {};
const keywordInTitles = {};
const keywordInExcerpts = {};
const allExplicitKeywords = [];

articles.forEach(article => {
  // Analizar keywords explícitas
  article.keywords.forEach(keyword => {
    allExplicitKeywords.push(keyword);
    keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1;
    
    if (article.title.toLowerCase().includes(keyword.toLowerCase())) {
      keywordInTitles[keyword] = (keywordInTitles[keyword] || 0) + 1;
    }
    
    if (article.excerpt.toLowerCase().includes(keyword.toLowerCase())) {
      keywordInExcerpts[keyword] = (keywordInExcerpts[keyword] || 0) + 1;
    }
  });
  
  // Extraer palabras individuales del título y excerpt para análisis
  const titleWords = article.title.toLowerCase()
    .replace(/[^\w\sáéíóúñü]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['para', 'con', 'los', 'las', 'del', 'que', 'una', 'uno'].includes(w));
  
  const excerptWords = article.excerpt.toLowerCase()
    .replace(/[^\w\sáéíóúñü]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['para', 'con', 'los', 'las', 'del', 'que', 'una', 'uno'].includes(w));
  
  [...titleWords, ...excerptWords].forEach(word => {
    if (word.length > 3) {
      keywordFrequency[word] = (keywordFrequency[word] || 0) + 1;
    }
  });
});

// Generar reporte
console.log('='.repeat(70));
console.log('📊 ANÁLISIS DE PALABRAS CLAVE DEL BLOG');
console.log('='.repeat(70));
console.log(`\n📝 Total de artículos analizados: ${articles.length}`);
console.log(`🔑 Total de keywords explícitas: ${allExplicitKeywords.length}`);
console.log(`📈 Total de palabras únicas analizadas: ${Object.keys(keywordFrequency).length}\n`);

console.log('🏆 TOP 30 KEYWORDS EXPLÍCITAS MÁS FRECUENTES:');
console.log('-'.repeat(70));
const explicitKeywords = {};
allExplicitKeywords.forEach(kw => {
  explicitKeywords[kw] = (explicitKeywords[kw] || 0) + 1;
});

const sortedExplicit = Object.entries(explicitKeywords)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30);

sortedExplicit.forEach(([keyword, count], index) => {
  const inTitles = articles.filter(a => 
    a.title.toLowerCase().includes(keyword.toLowerCase())
  ).length;
  const inExcerpts = articles.filter(a => 
    a.excerpt.toLowerCase().includes(keyword.toLowerCase())
  ).length;
  console.log(`${(index + 1).toString().padStart(2)}. ${keyword.padEnd(40)} ${count.toString().padStart(2)} veces | ${inTitles} títulos | ${inExcerpts} excerpts`);
});

console.log('\n\n📄 KEYWORDS POR ARTÍCULO:');
console.log('-'.repeat(70));
articles.forEach((article, index) => {
  console.log(`\n${index + 1}. ${article.title}`);
  if (article.keywords.length > 0) {
    console.log(`   Keywords (${article.keywords.length}): ${article.keywords.join(', ')}`);
  } else {
    console.log(`   ⚠️  Sin keywords definidas`);
  }
});

console.log('\n\n🌍 ANÁLISIS DE COBERTURA GEOGRÁFICA:');
console.log('-'.repeat(70));
const geoKeywords = ['madrid', 'españa', 'español', 'española', 'españoles'];
geoKeywords.forEach(geo => {
  const count = allExplicitKeywords.filter(k => 
    k.toLowerCase().includes(geo)
  ).length;
  const inTitles = articles.filter(a => 
    a.title.toLowerCase().includes(geo)
  ).length;
  console.log(`${geo}: ${count} keywords explícitas | ${inTitles} títulos`);
});

console.log('\n\n📂 KEYWORDS POR CATEGORÍA:');
console.log('-'.repeat(70));
const categories = {
  'Desarrollo Web': ['desarrollo web', 'web', 'sitio web', 'página web', 'crear sitio'],
  'Tecnologías': ['nextjs', 'next.js', 'react', 'wordpress', 'supabase', 'tecnología', 'tecnologías'],
  'SEO': ['seo', 'posicionamiento', 'google', 'optimización', 'búsqueda'],
  'Marketing': ['marketing', 'digital', 'publicidad', 'campaña', 'estrategias'],
  'E-commerce': ['tienda online', 'ecommerce', 'e-commerce', 'tienda', 'ventas online'],
  'Apps Móviles': ['app', 'apps', 'móvil', 'móviles', 'aplicación', 'aplicaciones'],
  'IA/Automatización': ['ia', 'inteligencia artificial', 'automatización', 'automatizaciones', 'chatbot'],
  'Empresa/Negocio': ['empresa', 'empresas', 'negocio', 'negocios', 'cliente', 'clientes']
};

Object.entries(categories).forEach(([category, terms]) => {
  const matching = allExplicitKeywords.filter(k => 
    terms.some(term => k.toLowerCase().includes(term.toLowerCase()))
  );
  const uniqueMatching = [...new Set(matching)];
  console.log(`${category}: ${uniqueMatching.length} keywords`);
  if (uniqueMatching.length > 0 && uniqueMatching.length <= 10) {
    console.log(`   → ${uniqueMatching.join(', ')}`);
  }
});

console.log('\n\n💡 RECOMENDACIONES:');
console.log('-'.repeat(70));
const missingGeo = articles.filter(a => 
  !a.title.toLowerCase().includes('madrid') && 
  !a.excerpt.toLowerCase().includes('madrid')
).length;
if (missingGeo > 0) {
  console.log(`⚠️  ${missingGeo} artículos no mencionan "Madrid" en título o excerpt`);
}

const articlesWithoutKeywords = articles.filter(a => a.keywords.length === 0).length;
if (articlesWithoutKeywords > 0) {
  console.log(`⚠️  ${articlesWithoutKeywords} artículos no tienen keywords definidas`);
}

const topKeywords = sortedExplicit.slice(0, 5).map(([kw]) => kw);
console.log(`\n✅ Keywords principales identificadas: ${topKeywords.join(', ')}`);
console.log(`\n💡 Sugerencia: Usa estas keywords en títulos, meta descriptions y contenido`);

console.log('\n' + '='.repeat(70));
