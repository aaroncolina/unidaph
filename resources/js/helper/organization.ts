import { GenderType, MaritalStatusType, OrganizationType } from '@/types/enums';

export const getOrganizationType = (
  age: number,
  gender: GenderType,
  maritalStatus: MaritalStatusType
) => {
  if (age >= 0 && age <= 12) return OrganizationType.Kid;
  if (age >= 13 && age <= 23) return OrganizationType.Youth;
  if (age >= 24 && age <= 40 && maritalStatus === MaritalStatusType.Single)
    return OrganizationType.YoungAdult;
  if (age >= 24 && age <= 40 && maritalStatus === MaritalStatusType.Married)
    return OrganizationType.YoungMarried;
  if (age >= 41 && gender === GenderType.Male) return OrganizationType.Kalalakihan;
  if (age >= 41 && gender === GenderType.Female) return OrganizationType.Kababaihan;

  return '';
};
