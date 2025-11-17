import { X, Plus, MessageSquare } from 'lucide-react';
import './Sidebar.css';

function Sidebar({ isOpen, onClose, onNewChat }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-button" onClick={() => { onNewChat(); onClose(); }}>
            <Plus size={20} />
            <span>New Chat</span>
          </button>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="chat-history">
            <div className="chat-history-item">
              <MessageSquare size={18} />
              <span>Previous conversations will appear here</span>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">T</div>
            <span>Tafita User</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
