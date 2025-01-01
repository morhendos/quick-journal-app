'use client';

// ... other imports remain same ...

// In the JSX part, change the buttons container from flex-col to flex-row:
          <div className="flex flex-row gap-2"> {/* Changed from flex-col to flex-row */}
            <button
              onClick={handleAddItem}
              disabled={!newItem.trim()}
              className="p-2 text-accent hover:bg-accent/10 rounded-md transition-colors"
              title="Save (⌘+Enter)"
            >
              <Check size={20} />
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewItem('');
              }}
              className="p-2 text-ink/70 hover:text-ink/90 rounded-md transition-colors"
              title="Cancel (Esc)"
            >
              <X size={20} />
            </button>
          </div>

// ... also update the edit mode buttons in the same way:
                <div className="flex flex-row gap-2"> {/* Changed from flex-col to flex-row */}
                  <button
                    onClick={handleSaveEdit}
                    disabled={!editText.trim()}
                    className="p-1 text-accent hover:bg-accent/10 rounded-md transition-colors"
                    title="Save (⌘+Enter)"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditText('');
                    }}
                    className="p-1 text-ink/70 hover:text-ink/90 rounded-md transition-colors"
                    title="Cancel (Esc)"
                  >
                    <X size={18} />
                  </button>
                </div>