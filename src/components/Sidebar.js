'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { name: 'Dashboard', path: '/', icon: '📊' },
  { name: 'Pins', path: '/pins', icon: '📌' },
  { name: 'Boards', path: '/boards', icon: '📋' },
  { name: 'Analytics', path: '/analytics', icon: '📈' },
  { name: 'Idea Generator', path: '/ideas', icon: '💡' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.icon}>🎯</span> PinFlow CRM
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path} 
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className={styles.profile}>
        <div className={styles.avatar}>T</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Test User</span>
          <span className={styles.userRole}>Blogger Admin</span>
        </div>
      </div>
    </aside>
  );
}
