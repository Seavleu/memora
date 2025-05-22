import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: string;
  participants: string[];
  status: 'processing' | 'completed';
  isFavorite: boolean;
  transcript?: string;
  summary?: string;
  progress?: number;
}

interface MeetingState {
  meetings: Meeting[];
  recentActivity: Activity[];
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addActivity: (activity: Activity) => void;
}

interface Activity {
  id: string;
  type: 'upload' | 'comment' | 'download' | 'summary';
  title: string;
  timestamp: Date;
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set) => ({
      meetings: [],
      recentActivity: [],
      addMeeting: (meeting) => set((state) => ({
        meetings: [...state.meetings, meeting],
        recentActivity: [
          {
            id: Date.now().toString(),
            type: 'upload',
            title: `Uploaded ${meeting.title}`,
            timestamp: new Date(),
          },
          ...state.recentActivity,
        ],
      })),
      updateMeeting: (id, updates) => set((state) => ({
        meetings: state.meetings.map((meeting) => 
          meeting.id === id ? { ...meeting, ...updates } : meeting
        ),
      })),
      deleteMeeting: (id) => set((state) => ({
        meetings: state.meetings.filter((meeting) => meeting.id !== id),
      })),
      toggleFavorite: (id) => set((state) => ({
        meetings: state.meetings.map((meeting) => 
          meeting.id === id ? { ...meeting, isFavorite: !meeting.isFavorite } : meeting
        ),
        recentActivity: [
          {
            id: Date.now().toString(),
            type: 'comment',
            title: `Marked ${state.meetings.find(m => m.id === id)?.title} as ${
              state.meetings.find(m => m.id === id)?.isFavorite ? 'unfavorite' : 'favorite'
            }`,
            timestamp: new Date(),
          },
          ...state.recentActivity,
        ],
      })),
      addActivity: (activity) => set((state) => ({
        recentActivity: [activity, ...state.recentActivity].slice(0, 20),
      })),
    }),
    {
      name: 'memora-storage',
      partialize: (state) => ({ 
        meetings: state.meetings.map(meeting => ({
          ...meeting, 
          date: meeting.date.toISOString()
        })),
        recentActivity: state.recentActivity.map(activity => ({
          ...activity,
          timestamp: activity.timestamp.toISOString()
        }))
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert ISO strings back to Date objects
          state.meetings = state.meetings.map(meeting => ({
            ...meeting,
            date: new Date(meeting.date as unknown as string)
          }));
          state.recentActivity = state.recentActivity.map(activity => ({
            ...activity,
            timestamp: new Date(activity.timestamp as unknown as string)
          }));
        }
      }
    }
  )
);