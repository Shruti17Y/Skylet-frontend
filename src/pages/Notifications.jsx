import React from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { Bell, CheckCheck, Check, Clock, ExternalLink } from 'lucide-react';

const Notifications = () => {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}>
            <Bell size={18} /> UPDATES & ALERTS
          </div>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--text-main)', margin: '0.25rem 0' }}>Notifications</h1>
        </div>

        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="btn btn-sm btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCheck size={16} /> Mark All as Read
          </button>
        )}
      </div>

      {loading && notifications.length === 0 ? (
        <LoadingSpinner message="Checking notifications..." />
      ) : notifications.length === 0 ? (
        <EmptyState
          title="No Notifications"
          message="You don't have any unread order alerts or system notifications right now."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="card"
              style={{
                padding: '1.25rem',
                backgroundColor: notif.is_read ? 'var(--bg-card)' : 'rgba(245, 158, 11, 0.06)',
                border: notif.is_read ? '1px solid var(--border-color)' : '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                position: 'relative',
              }}
            >
              <div style={{ padding: '0.65rem', borderRadius: '50%', backgroundColor: notif.is_read ? 'var(--bg-input)' : 'var(--primary-light)', color: notif.is_read ? 'var(--text-dim)' : 'var(--primary)', flexShrink: 0 }}>
                <Bell size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0 }}>{notif.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} /> {new Date(notif.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {notif.message}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {notif.link && (
                    <Link to={notif.link} className="btn btn-sm btn-outline" style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem' }}>
                      View Details <ExternalLink size={13} />
                    </Link>
                  )}

                  {!notif.is_read && (
                    <button onClick={() => markAsRead(notif.id)} className="btn btn-sm btn-secondary" style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem' }}>
                      <Check size={13} /> Mark Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
