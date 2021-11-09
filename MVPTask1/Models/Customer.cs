using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;


// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace MVPTask1.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }

        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [DisplayName("Customer Name")]
        [Required(ErrorMessage = "Customer Name is required")]
        [StringLength(100, MinimumLength = 3)] 
        public string Cname { get; set; }

        [Required(ErrorMessage = "Customer Address is required")]
        [StringLength(100)]
        public string Caddress { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
