// Pipeline API service for data.acquisitionsystems.com

const API_BASE_URL = "https://data.acquisitionsystems.com/api";

export interface UpdateDealStageData {
  deal_id: string;
  new_stage: string;
}

export interface UpdateMeetingShowStatusData {
  meeting_id: string;
  show_status: string;
}

/**
 * Update deal stage/lead status via API
 * PUT /api/pipeline/update_deal_stage
 */
export async function updateDealStage(data: UpdateDealStageData): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/pipeline/update_deal_stage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to update deal stage:", response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating deal stage:", error);
    return false;
  }
}

/**
 * Update meeting show status (Shown/Not Shown) via API
 * PUT /api/pipeline/update_meeting_show_status
 */
export async function updateMeetingShowStatus(data: UpdateMeetingShowStatusData): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/pipeline/update_meeting_show_status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to update meeting show status:", response.status, response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating meeting show status:", error);
    return false;
  }
}
