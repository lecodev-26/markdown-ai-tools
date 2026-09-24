import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import TextToTable from './pages/TextToTable.jsx'
import CsvToTable from './pages/CsvToTable.jsx'
import ListToTable from './pages/ListToTable.jsx'
import TableToCsv from './pages/TableToCsv.jsx'
import MarkdownCleaner from './pages/MarkdownCleaner.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import CookieBanner from './components/CookieBanner.jsx'

export default function App(){
  return (
    <>
      <Header />
      <main style={{minHeight:'80vh', padding:'32px 0 64px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-to-table" element={<TextToTable />} />
          <Route path="/csv-to-table" element={<CsvToTable />} />
          <Route path="/list-to-table" element={<ListToTable />} />
          <Route path="/table-to-csv" element={<TableToCsv />} />
          <Route path="/cleaner" element={<MarkdownCleaner />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
