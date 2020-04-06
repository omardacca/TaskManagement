using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagementAPI.Data.CustomValidations
{
    public class DateLessThanAttribute : ValidationAttribute
    {
        private readonly string _comparisonProperty;

        public DateLessThanAttribute(string comparisonProperty)
        {
            _comparisonProperty = comparisonProperty;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if(value != null)
            {
                ErrorMessage = ErrorMessageString;
                var currentValue = (DateTime)value;

                var property = validationContext.ObjectType.GetProperty(_comparisonProperty);

                if (property == null)
                    throw new ArgumentException("Property with this name not found");

                var comparisonValue = (DateTime)property.GetValue(validationContext.ObjectInstance);

                if (currentValue > comparisonValue)
                    return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}
