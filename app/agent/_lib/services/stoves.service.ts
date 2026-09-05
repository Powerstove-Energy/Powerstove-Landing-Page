'use server';

import { API_ROUTES } from '@/lib/api/endpoints';
import { backendRequest } from '@/lib/api/server-api-client';
import { executeBackendService } from '@/lib/api/server-service';
import { ServiceResult } from '@/lib/api/service-result';
import { StoveUnitStatus } from '../types';

export interface StoveModel {
  stove_model_uuid: string;
  sku: string;
  name: string;
  category: string;
  description: string | null;
  price_kobo: number;
  is_active: boolean;
}

export interface StoveUnit {
  stove_unit_uuid: string;
  stove_model_uuid: string;
  serial_number: string;
  status: StoveUnitStatus;
  customer_uuid: string | null;
  model: StoveModel;
}

export async function listStoveModels(): Promise<ServiceResult<StoveModel[]>> {
  return executeBackendService(() => backendRequest<StoveModel[]>(API_ROUTES.stoves.models()));
}

export async function listAvailableStoveUnits(stoveModelUuid: string): Promise<ServiceResult<StoveUnit[]>> {
  return executeBackendService(() =>
    backendRequest<StoveUnit[]>(
      `${API_ROUTES.stoves.units()}?status=IN_STOCK&stove_model_uuid=${stoveModelUuid}`,
    ),
  );
}

export interface AddStoveUnitsInput {
  stove_model_uuid: string;
  serial_numbers: string[];
}

export interface AddStoveUnitsResult {
  requested: number;
  created: number;
  skipped: number;
}

export async function addStoveUnits(input: AddStoveUnitsInput): Promise<ServiceResult<AddStoveUnitsResult>> {
  return executeBackendService(() =>
    backendRequest<AddStoveUnitsResult>(API_ROUTES.stoves.unitsBulk(), {
      method: 'POST',
      body: { stove_model_uuid: input.stove_model_uuid, serial_numbers: input.serial_numbers },
    }),
  );
}
