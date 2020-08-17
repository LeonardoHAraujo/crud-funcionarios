(function ($) {
  Employeers = {
    start() {

      // declaration of fields and selectors

      this.$document = $(document);
      this.$modal = $('[data-modal-edit]');

      this.$id = $('[data-id]');

      this.$btnNew = $('[data-btn-new]');
      this.$btnConfirm = $('[data-btn-confirm]');

      this.$inputSearch = $('[data-input-value]');
      this.$btnSearch = $('[data-btn-search]');

      this.$dataDynamics = $('#dataDynamics');

      this.$alertMessage = $('[data-message-validate]');

      this.$name = $('#name');
      this.$office = $('#office');
      this.$sector = $('#sector');
      this.$address = $('#address');

      this.$token = $('input')[0].value;

      // event function call
      this.bind();
    },

    // Event call function
    bind() {
      this.$document.ready($.proxy(this.onListEmployeers, this));

      this.$btnSearch.on('click', $.proxy(this.onListEmployeer, this));
      this.$btnNew.on('click', $.proxy(this.onBtnNewClick, this));

      this.$btnConfirm.on('click', $.proxy(this.onFormSubmit, this));
  
      this.$dataDynamics.on('click', '[btn-edit]', $.proxy(this.onBtnEditClick, this));
      this.$dataDynamics.on('click', '[btn-destroy]', $.proxy(this.onBtnDestroyClick, this));
    },

    // Employee list function
    onListEmployeers() {
      $.get('funcionarios/list', { _token: this.$token }, req => {
        req.forEach(employeer => {
          this.$dataDynamics.append(this.onRender(employeer))
        });
      });
    },

    // List function of an employee
    onListEmployeer(event) {
      event.preventDefault();

      this.$dataDynamics.text('');

      if("" == this.$inputSearch.val()) {
        this.onListEmployeers();
      }else {
        $.get(`funcionarios/show/${this.$inputSearch.val()}`, { _token: this.$token }, req => {
        req.forEach(employeer => {
          this.$dataDynamics.append(this.onRender(employeer))
        });
      });
      }

    },

    // Data rendering function
    onRender(employeer) {
      return `<div id="containList" class="container-list">
          <div id="a-linha-dinamico" class="row">
            <div id="name" class="col-sm">
                ${employeer.name}
            </div>
            <div id="office" class="col-sm">
                ${employeer.office}
            </div>
            <div id="sector" class="col-sm">
                ${employeer.sector}
            </div>
            <div id="address" class="col-sm">
                ${employeer.address}
            </div>
            <div id="created_at" class="col-sm">
                ${employeer.created_at}
            </div>
            <div id="updated_at" class="col-sm">
                ${employeer.updated_at}
            </div>
            <div class="col-sm" id="btn-area">
              <div class="btn" id="btn-area2">
                <button 
                  id="edit" 
                  class="btn btn-info" 
                  btn-edit
                  data-id="${employeer.id}"
                  data-name="${employeer.name}"
                  data-office="${employeer.office}"
                  data-sector="${employeer.sector}"
                  data-address="${employeer.address}"
                >
                  Editar
                </button>

                <button 
                  id="delete" 
                  class="btn btn-danger" 
                  btn-destroy
                  data-id="${employeer.id}"
                >
                  Deletar
                </button>

              </div>
            </div>
          </div>
      </div>`
    },

    // Form submit function
    onFormSubmit (event) {
      event.preventDefault();

      this.$btnConfirm.prop('disabled', true);

      if ("" !== this.$id.val()) {
        this.onEditSubmit();
        return;
      }

      var validInputs = true;

      if ('' === this.$address.val()) {
        this.$alertMessage.removeClass('hide-message');
        this.$alertMessage.addClass('alert');
        this.$alertMessage.addClass('alert-danger');
        this.$alertMessage.text('Favor informar um endereço.');
        validInputs = false;
        this.$btnConfirm.prop('disabled', false);
      }

      if ('' === this.$sector.val()) {
        this.$alertMessage.removeClass('hide-message');
        this.$alertMessage.addClass('alert');
        this.$alertMessage.addClass('alert-danger');
        this.$alertMessage.text('Favor informar um setor.');
        validInputs = false;
        this.$btnConfirm.prop('disabled', false);
      }

      if ('' === this.$office.val()) {
        this.$alertMessage.removeClass('hide-message');
        this.$alertMessage.addClass('alert');
        this.$alertMessage.addClass('alert-danger');
        this.$alertMessage.text('Favor informar um cargo.');
        validInputs = false;
        this.$btnConfirm.prop('disabled', false);
      }

      if ('' === this.$name.val()) {
        this.$alertMessage.removeClass('hide-message');
        this.$alertMessage.addClass('alert');
        this.$alertMessage.addClass('alert-danger');
        this.$alertMessage.text('Favor informar um nome.');
        validInputs = false;
        this.$btnConfirm.prop('disabled', false);
      }

      if (validInputs) {
        const creating = $.ajax({
          method: 'POST',
          url: 'funcionarios/create',
          ontentType: 'application/json',
          data: {
            _token: this.$token,
            name : this.$name.val(),
            office : this.$office.val(),
            sector : this.$sector.val(),
            address : this.$address.val()
          },
        });
    
        creating.done($.proxy(this.onCreateSuccess, this));
      }
    },

    onCreateSuccess (data) {
      if(data.success) {
        if(this.$alertMessage.hasClass('hide-message')) {
          this.$alertMessage.removeClass('hide-message');
          this.$alertMessage.addClass('alert');
          this.$alertMessage.addClass('alert-success');
          this.$alertMessage.text(data.message);

          setTimeout(() => {
            this.$modal.modal('hide');
          }, 2000);

          this.$dataDynamics.text('');
          this.onListEmployeers();

        } else {
          this.$alertMessage.removeClass('alert-danger');
          this.$alertMessage.addClass('alert-success');
          this.$alertMessage.text(data.message);

          setTimeout(() => {
            this.$modal.modal('hide');
          }, 2000);

          this.$dataDynamics.text('');
          this.onListEmployeers();

        }
      }else {
        if(this.$alertMessage.hasClass('hide-message')) {
          this.$alertMessage.removeClass('hide-message');
          this.$alertMessage.addClass('alert');
          this.$alertMessage.addClass('alert-danger');
          this.$alertMessage.text(data.message);

          this.$btnConfirm.prop('disabled', false);

        } else {
          this.$alertMessage.removeClass('alert-success');
          this.$alertMessage.addClass('alert-danger');
          this.$alertMessage.text(data.message);

          this.$btnConfirm.prop('disabled', false);

        }
      }
    },

    // Modal screen opening function
    onBtnNewClick (event) {
      event.preventDefault();
      this.resetModal();
      this.$modal.modal();
    },

    // Modal screen reset function
    resetModal () {
      this.$name.val('');
      this.$office.val('');
      this.$sector.val('');
      this.$address.val('');
      this.$alertMessage.removeClass('alert');
      this.$alertMessage.removeClass('alert-danger');
      this.$alertMessage.addClass('hide-message');
      this.$btnConfirm.prop('disabled', false);
    },

    resetModalEdit() {
      this.$alertMessage.removeClass('alert');
      this.$alertMessage.removeClass('alert-danger');
      this.$alertMessage.removeClass('alert-success');
      this.$alertMessage.addClass('hide-message');
      this.$btnConfirm.prop('disabled', false);
    },

    // Opening function of the modal editing screen
    onBtnEditClick (event) {
      event.preventDefault();

      this.resetModalEdit();

      const $btn = $(event.currentTarget);
      const id = $.trim($btn.data('id'));
      const name = $.trim($btn.data('name'));
      const office = $.trim($btn.data('office'));
      const sector = $.trim($btn.data('sector'));
      const address = $.trim($btn.data('address'));

      this.$id.val(id);
      this.$name.val(name);
      this.$office.val(office);
      this.$sector.val(sector);
      this.$address.val(address);

      this.$modal.modal();
    },

    // Employee delete function
    onBtnDestroyClick (event) {
      event.preventDefault();
      swal({
        title: "Tem certeza?",
        text: "Uma vez deletado, não poderá recuperar o funcionário!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          const $btn = $(event.currentTarget);
          const id = $.trim($btn.data('id'));

          $.ajax({
            url: `funcionarios/destroy/${id}`,
            type: 'POST',
            data: {
              _token: this.$token
            },
            success: function(data) {
              if(data.success) {
                location.reload();
              }
            }
          });
        } else {
          swal("Você escolheu cancelar a exclusão!");
        }
      }); 

    },

    // Edit form submit function
    onEditSubmit () {

      this.$btnConfirm.prop('disabled', true);

      var validInputs = true;

      if ('' === this.$address.val()) {
        this.$alertMessage.removeClass('hide-message');
        this.$alertMessage.addClass('alert');
        this.$alertMessage.addClass('alert-danger');
        this.$alertMessage.text('Favor informar um endereço.');
        validInputs = false;
        this.$btnConfirm.prop('disabled', false);
      }

      if ('' === this.$sector.val()) {
        this.$alertMessage.removeClass('hide-message');
        this.$alertMessage.addClass('alert');
        this.$alertMessage.addClass('alert-danger');
        this.$alertMessage.text('Favor informar um setor.');
        validInputs = false;
        this.$btnConfirm.prop('disabled', false);
      }

      if ('' === this.$office.val()) {
        this.$alertMessage.removeClass('hide-message');
        this.$alertMessage.addClass('alert');
        this.$alertMessage.addClass('alert-danger');
        this.$alertMessage.text('Favor informar um cargo.');
        validInputs = false;
        this.$btnConfirm.prop('disabled', false);
      }

      if ('' === this.$name.val()) {
        this.$alertMessage.removeClass('hide-message');
        this.$alertMessage.addClass('alert');
        this.$alertMessage.addClass('alert-danger');
        this.$alertMessage.text('Favor informar um nome.');
        validInputs = false;
        this.$btnConfirm.prop('disabled', false);
      }

      if (validInputs) {
        const edit = $.ajax({
          method: 'POST',
          url: `funcionarios/update/${this.$id.val()}`,
          ontentType: 'application/json',
          data: {
            _token: this.$token,
            name : this.$name.val(),
            office : this.$office.val(),
            sector : this.$sector.val(),
            address : this.$address.val()
          },
        });
    
        edit.done($.proxy(this.onEditSuccess, this)); 
      }    
    },

    onEditSuccess (data) {
      if(data.success) {
        if(this.$alertMessage.hasClass('hide-message')) {
          this.$alertMessage.removeClass('hide-message');
          this.$alertMessage.addClass('alert');
          this.$alertMessage.addClass('alert-success');
          this.$alertMessage.text(data.message);

          setTimeout(() => {
            this.$modal.modal('hide');
          }, 2000);

          this.$dataDynamics.text('');
          this.onListEmployeers();

        } else {
          this.$alertMessage.removeClass('alert-danger');
          this.$alertMessage.addClass('alert-success');
          this.$alertMessage.text(data.message);

          setTimeout(() => {
            this.$modal.modal('hide');
          }, 2000);

          this.$dataDynamics.text('');
          this.onListEmployeers();

        }
      }else {
        if(this.$alertMessage.hasClass('hide-message')) {
          this.$alertMessage.removeClass('hide-message');
          this.$alertMessage.addClass('alert');
          this.$alertMessage.addClass('alert-danger');
          this.$alertMessage.text(data.message);

          this.$btnConfirm.prop('disabled', false);

        } else {
          this.$alertMessage.removeClass('alert-success');
          this.$alertMessage.addClass('alert-danger');
          this.$alertMessage.text(data.message);

          this.$btnConfirm.prop('disabled', false);

        }
      }
    }

  };

  // Boot function
  $(function () {
    Employeers.start();
  });
})(jQuery);