import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Calendar.css' 

function Calendar() {
  // Use a date that respects Thai timezone for "today"
  const getThaiToday = () => {
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

    const parts = formatter.formatToParts(now)
    const year = Number(parts.find(p => p.type === 'year')?.value)
    const month = Number(parts.find(p => p.type === 'month')?.value) - 1
    const day = Number(parts.find(p => p.type === 'day')?.value)

    return new Date(year, month, day)
  }

  const today = useMemo(() => getThaiToday(), [])
  const [currentDate, setCurrentDate] = useState(today)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false)
  const navigate = useNavigate()
  const [color1, setColor1] = useState(() => {
    try {
      const stored = localStorage.getItem('ejournal-theme')
      if (stored) return JSON.parse(stored).c1
    } catch (e) {
    }
    return '#f3f0ea'
  })
  const [color2, setColor2] = useState(() => {
    try {
      const stored = localStorage.getItem('ejournal-theme')
      if (stored) return JSON.parse(stored).c2
    } catch (e) {}
    return '#4c3734'
  })
  const [color3, setColor3] = useState(() => {
    try {
      const stored = localStorage.getItem('ejournal-theme')
      if (stored) return JSON.parse(stored).c3
    } catch (e) {}
    return '#6e5a5a'
  })

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days = []
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    while (days.length % 7 !== 0) {
      days.push(null)
    }
    
    return days
  }
  
  const days = getDaysInMonth(currentDate)
  const currentMonth = monthNames[currentDate.getMonth()]
  const currentYear = currentDate.getFullYear()

  const isToday = (day) => {
    if (!day) return false
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      const year = prev.getFullYear()
      const month = prev.getMonth()
      if (month === 0) {
        return new Date(year - 1, 11, 1)
      }
      return new Date(year, month - 1, 1)
    })
  }

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const year = prev.getFullYear()
      const month = prev.getMonth()
      if (month === 11) {
        return new Date(year + 1, 0, 1)
      }
      return new Date(year, month + 1, 1)
    })
  }
  
  const applyThemeColors = (c1, c2, c3) => {
    const root = document.documentElement
    root.style.setProperty('--theme-color-1', c1)
    root.style.setProperty('--theme-color-2', c2)
    root.style.setProperty('--theme-color-3', c3)
  }

  useEffect(() => {
    applyThemeColors(color1, color2, color3)
    try {
      localStorage.setItem('ejournal-theme', JSON.stringify({ c1: color1, c2: color2, c3: color3 }))
    } catch (e) {
    }
  }, [color1, color2, color3])

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const toggleThemePicker = () => {
    setIsThemePickerOpen((prev) => !prev)
  }

  const handleColor1Change = (event) => {
    setColor1(event.target.value)
  }

  const handleColor2Change = (event) => {
    setColor2(event.target.value)
  }

  const handleColor3Change = (event) => {
    setColor3(event.target.value)
  }

  return (
    <div className={`calendar-page ${isSidebarOpen ? 'calendar-page--with-sidebar' : ''}`}>
      <button
        className="calendar-nav-btn"
        aria-label="Toggle menu"
        type="button"
        onClick={toggleSidebar}
      >
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.9465 2.57188C11.8737 2.64445 11.816 2.73066 11.7766 2.82557C11.7372 2.92049 11.7169 3.02224 11.7169 3.125C11.7169 3.22776 11.7372 3.32951 11.7766 3.42443C11.816 3.51934 11.8737 3.60555 11.9465 3.67813L20.7699 12.5L11.9465 21.3219C11.7998 21.4686 11.7173 21.6675 11.7173 21.875C11.7173 22.0825 11.7998 22.2814 11.9465 22.4281C12.0932 22.5748 12.2921 22.6572 12.4996 22.6572C12.707 22.6572 12.906 22.5748 13.0527 22.4281L22.4277 13.0531C22.5005 12.9806 22.5582 12.8943 22.5976 12.7994C22.637 12.7045 22.6572 12.6028 22.6572 12.5C22.6572 12.3972 22.637 12.2955 22.5976 12.2006C22.5582 12.1057 22.5005 12.0194 22.4277 11.9469L13.0527 2.57188C12.9801 2.49912 12.8939 2.4414 12.799 2.40201C12.7041 2.36263 12.6023 2.34235 12.4996 2.34235C12.3968 2.34235 12.2951 2.36263 12.2002 2.40201C12.1052 2.4414 12.019 2.49912 11.9465 2.57188Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M5.69646 2.57188C5.6237 2.64445 5.56598 2.73066 5.52659 2.82557C5.48721 2.92049 5.46693 3.02224 5.46693 3.125C5.46693 3.22776 5.48721 3.32951 5.52659 3.42443C5.56598 3.51934 5.6237 3.60555 5.69646 3.67813L14.5199 12.5L5.69646 21.3219C5.62382 21.3945 5.5662 21.4807 5.52689 21.5757C5.48758 21.6706 5.46734 21.7723 5.46734 21.875C5.46734 21.9777 5.48758 22.0794 5.52689 22.1743C5.5662 22.2693 5.62382 22.3555 5.69646 22.4281C5.76909 22.5008 5.85533 22.5584 5.95023 22.5977C6.04514 22.637 6.14686 22.6572 6.24958 22.6572C6.35231 22.6572 6.45402 22.637 6.54893 22.5977C6.64384 22.5584 6.73007 22.5008 6.80271 22.4281L16.1777 13.0531C16.2505 12.9806 16.3082 12.8943 16.3476 12.7994C16.387 12.7045 16.4072 12.6028 16.4072 12.5C16.4072 12.3972 16.387 12.2955 16.3476 12.2006C16.3082 12.1057 16.2505 12.0194 16.1777 11.9469L6.80271 2.57188C6.73013 2.49912 6.64392 2.4414 6.54901 2.40201C6.45409 2.36263 6.35234 2.34235 6.24958 2.34235C6.14682 2.34235 6.04507 2.36263 5.95015 2.40201C5.85524 2.4414 5.76903 2.49912 5.69646 2.57188Z" fill="currentColor"/>
        </svg>
      </button>
      
      <div className="calendar-month-wrapper">
        <button
          type="button"
          className="calendar-month-btn"
          aria-label="Previous month"
          onClick={goToPreviousMonth}
        >
          ‹
        </button>
        <h1 className="calendar-month">{currentMonth}</h1>
        <button
          type="button"
          className="calendar-month-btn"
          aria-label="Next month"
          onClick={goToNextMonth}
        >
          ›
        </button>
      </div>
      <h2 className="calendar-year">{currentYear}</h2>

      <div className={`calendar-sidebar ${isSidebarOpen ? 'calendar-sidebar--open' : ''}`}>
        <button
          className="calendar-sidebar-close-btn"
          type="button"
          aria-label="Close menu"
          onClick={toggleSidebar}
        >
          «
        </button>
        <div className="calendar-sidebar-header">ejournal</div>
        <nav className="calendar-sidebar-nav" aria-label="Calendar navigation">
          <button type="button" className="calendar-sidebar-link">
            <span className="calendar-sidebar-link-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 12c1.66 0 3-1.34 3-3S13.66 6 12 6s-3 1.34-3 3 1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-1.5C19 15.17 14.33 14 12 14Z" fill="currentColor" />
              </svg>
            </span>
            <span className="calendar-sidebar-link-label">Account</span>
          </button>
          <button type="button" className="calendar-sidebar-link" onClick={() => { navigate('/'); setIsSidebarOpen(false); }}>
            <span className="calendar-sidebar-link-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 3 3 10h2v8h5v-5h4v5h5v-8h2L12 3Z" fill="currentColor" />
              </svg>
            </span>
            <span className="calendar-sidebar-link-label">Home</span>
          </button> 
          <button type="button" className="calendar-sidebar-link calendar-sidebar-link--accent">
            <span className="calendar-sidebar-link-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14Zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14Z" fill="currentColor" />
              </svg>
            </span>
            <span className="calendar-sidebar-link-label">Search</span>
          </button>
          <button type="button" className="calendar-sidebar-link">
            <span className="calendar-sidebar-link-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 5h7v2H6v10h7v2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9.59 3.59L18.17 11H11v2h7.17l-2.58 2.59L17 17l5-5-5-5-1.41 1.59Z" fill="currentColor" />
              </svg>
            </span>
            <span className="calendar-sidebar-link-label">Logout</span>
          </button>
        </nav>
      </div>
      
      <button className="calendar-customize-btn" type="button" onClick={toggleThemePicker}>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_240_667)">
            <path d="M19.4266 15.7344C22.0828 16.5391 25 17.4219 25 12.5C25 10.0277 24.2669 7.61099 22.8934 5.55538C21.5199 3.49976 19.5676 1.89761 17.2835 0.951511C14.9995 0.00541601 12.4861 -0.242126 10.0614 0.24019C7.63661 0.722505 5.40933 1.91301 3.66117 3.66117C1.91301 5.40933 0.722505 7.63661 0.24019 10.0614C-0.242126 12.4861 0.00541601 14.9995 0.951511 17.2835C1.89761 19.5676 3.49976 21.5199 5.55538 22.8934C7.61099 24.2669 10.0277 25 12.5 25C15.6188 25 15.3531 22.65 15.0766 20.1875C14.8828 18.4672 14.6828 16.6922 15.625 15.625C16.3516 14.8016 17.8438 15.2547 19.4266 15.7344ZM12.5 7.81251C12.1922 7.81251 11.8874 7.75188 11.6031 7.6341C11.3187 7.51631 11.0604 7.34368 10.8427 7.12604C10.6251 6.9084 10.4524 6.65003 10.3347 6.36567C10.2169 6.08131 10.1563 5.77654 10.1563 5.46876C10.1563 5.16097 10.2169 4.8562 10.3347 4.57184C10.4524 4.28748 10.6251 4.02911 10.8427 3.81147C11.0604 3.59384 11.3187 3.4212 11.6031 3.30341C11.8874 3.18563 12.1922 3.12501 12.5 3.12501C13.1216 3.12501 13.7177 3.37194 14.1573 3.81147C14.5968 4.25101 14.8438 4.84715 14.8438 5.46876C14.8438 6.09036 14.5968 6.6865 14.1573 7.12604C13.7177 7.56558 13.1216 7.81251 12.5 7.81251ZM19.5313 12.5C18.9097 12.5 18.3135 12.2531 17.874 11.8135C17.4344 11.374 17.1875 10.7779 17.1875 10.1563C17.1875 9.53465 17.4344 8.93851 17.874 8.49897C18.3135 8.05944 18.9097 7.81251 19.5313 7.81251C20.1529 7.81251 20.749 8.05944 21.1885 8.49897C21.6281 8.93851 21.875 9.53465 21.875 10.1563C21.875 10.7779 21.6281 11.374 21.1885 11.8135C20.749 12.2531 20.1529 12.5 19.5313 12.5ZM7.03125 10.1563C7.03125 9.53465 6.78432 8.93851 6.34478 8.49897C5.90525 8.05944 5.30911 7.81251 4.6875 7.81251C4.06589 7.81251 3.46975 8.05944 3.03022 8.49897C2.59068 8.93851 2.34375 9.53465 2.34375 10.1563C2.34375 10.7779 2.59068 11.374 3.03022 11.8135C3.46975 12.2531 4.06589 12.5 4.6875 12.5C5.30911 12.5 5.90525 12.2531 6.34478 11.8135C6.78432 11.374 7.03125 10.7779 7.03125 10.1563ZM10.1563 15.625C10.1563 15.0034 9.90932 14.4073 9.46978 13.9677C9.03025 13.5282 8.43411 13.2813 7.8125 13.2813C7.19089 13.2813 6.59475 13.5282 6.15522 13.9677C5.71568 14.4073 5.46875 15.0034 5.46875 15.625C5.46875 16.2466 5.71568 16.8428 6.15522 17.2823C6.59475 17.7218 7.19089 17.9688 7.8125 17.9688C8.43411 17.9688 9.03025 17.7218 9.46978 17.2823C9.90932 16.8428 10.1563 16.2466 10.1563 15.625Z" fill="currentColor"/>
          </g>
          <defs>
            <clipPath id="clip0_240_667">
              <rect width="25" height="25" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <span>Customize</span>
      </button>
      {isThemePickerOpen && (
        <div className="calendar-theme-popover" aria-label="Customize colors">
          <label className="calendar-theme-swatch calendar-theme-swatch--pink">
            <input
              type="color"
              aria-label="Change background and SUN-SAT text color"
              value={color1}
              onChange={handleColor1Change}
              style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
            />
          </label>
          <label className="calendar-theme-swatch calendar-theme-swatch--blue">
            <input
              type="color"
              aria-label="Change day number text and cell border color"
              value={color2}
              onChange={handleColor2Change}
              style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
            />
          </label>
          <label className="calendar-theme-swatch calendar-theme-swatch--brown">
            <input
              type="color"
              aria-label="Change today circle, SUN-SAT header background and year color"
              value={color3}
              onChange={handleColor3Change}
              style={{ opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }}
            />
          </label>
        </div>
      )}

      <div className="calendar-search">
        <span className="calendar-search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L19 20.49 20.49 19 15.5 14Zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14Z" fill="currentColor" />
          </svg>
        </span>
        <input
          className="calendar-search-input"
          type="text"
          placeholder="Search by tags, mood and time"
        />
      </div>

      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day} className="calendar-header-cell">
            {day}
          </div>
        ))}
        
      {days.map((day, index) => (
        <div
          key={index}
          className="calendar-day-cell"
        >
          {day && (
            isToday(day) ? (
              <div className="calendar-day-highlight">
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="17.5" cy="17.5" r="17.5" fill="var(--calendar-today-circle)" />
                </svg>
                <span className="calendar-day-number-highlight">{day}</span>
              </div>
            ) : (
              <span className="calendar-day-number">{day}</span>
            )
          )}
        </div>
      ))}
      </div>
    </div>
  )
}

export default Calendar
